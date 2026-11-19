import { createContext, useCallback, useContext, useState } from "react";
import { DEFAULT_LOCATION } from "./config.js";
import { roundCoord } from "./utils.js";


const KEY = "alerta-cidadao:location";
const Ctx = createContext(null);

function load() {
  try {
    const r = JSON.parse(localStorage.getItem(KEY));
    if (r && Number.isFinite(r.lat) && Number.isFinite(r.lon)) return r;
  } catch {}
  return DEFAULT_LOCATION;
}

export function LocationProvider({ children }) {
  const [location, setLoc] = useState(load);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const setLocation = useCallback((l) => {
    setLoc(l);
    try { localStorage.setItem(KEY, JSON.stringify(l)); } catch { /* ignora */ }
  }, []);

  const locateMe = useCallback(() => {
    setGeoError("");
    if (!navigator.geolocation) return setGeoError("Seu navegador não oferece localização.");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: roundCoord(pos.coords.latitude), lon: roundCoord(pos.coords.longitude), label: "Minha localização", source: "gps" });
        setLocating(false);
      },
      () => {
        setGeoError("Não foi possível obter sua localização. Verifique a permissão ou busque uma cidade.");
        setLocating(false);
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, [setLocation]);

  return <Ctx.Provider value={{ location, setLocation, locateMe, locating, geoError }}>{children}</Ctx.Provider>;
}

export const usePlace = () => useContext(Ctx);
