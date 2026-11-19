import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./services/supabase.js";
import { usePlace } from "./LocationContext.jsx";
import { NEARBY_RADIUS_KM, REPORT_TTL_HOURS } from "./config.js";
import { boundingBox, distanceKm, roundCoord } from "./utils.js";


const KEY = "alerta-cidadao:reports";
const fromRow = (r) => ({ id: r.id, type: r.type, text: r.text, lat: r.lat, lon: r.lon, at: r.created_at });
const Ctx = createContext(null);

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
}

export function ReportsProvider({ children }) {
  const { location } = usePlace();
  const { lat, lon } = location;
  const [all, setAll] = useState(supabase ? [] : loadLocal);
  const [loading, setLoading] = useState(!!supabase);


  useEffect(() => {
    if (supabase) return;
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* ignora */ }
  }, [all]);

  
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    setLoading(true);
    const box = boundingBox({ lat, lon }, NEARBY_RADIUS_KM);
    const since = new Date(Date.now() - REPORT_TTL_HOURS * 3600 * 1000).toISOString();

    supabase.from("reports").select("*")
      .gte("created_at", since)
      .gte("lat", box.minLat).lte("lat", box.maxLat)
      .gte("lon", box.minLon).lte("lon", box.maxLon)
      .order("created_at", { ascending: false }).limit(100)
      .then(({ data }) => { if (alive) { setAll(data ? data.map(fromRow) : []); setLoading(false); } });

    const channel = supabase.channel("reports-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "reports" },
        (p) => setAll((r) => (r.some((x) => x.id === p.new.id) ? r : [fromRow(p.new), ...r])))
      .subscribe();

    return () => { alive = false; supabase.removeChannel(channel); };
  }, [lat, lon]);

 
  const reports = useMemo(() => {
    const limit = Date.now() - REPORT_TTL_HOURS * 3600 * 1000;
    return all
      .map((r) => ({ ...r, km: distanceKm({ lat, lon }, r) }))
      .filter((r) => r.km <= NEARBY_RADIUS_KM && new Date(r.at).getTime() >= limit)
      .sort((a, b) => new Date(b.at) - new Date(a.at));
  }, [all, lat, lon]);

  const addReport = async ({ type, text }) => {
    const row = { type, text, lat: roundCoord(lat), lon: roundCoord(lon) };
    if (supabase) {
      const { error } = await supabase.from("reports").insert(row);
      if (error) throw error; 
      return; 
    }
    setAll((r) => [{ id: Date.now(), ...row, at: new Date().toISOString() }, ...r]);
  };

  return <Ctx.Provider value={{ reports, addReport, loading, shared: !!supabase }}>{children}</Ctx.Provider>;
}

export const useReports = () => useContext(Ctx);
