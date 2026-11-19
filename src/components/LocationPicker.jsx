import { useState } from "react";
import { usePlace } from "../LocationContext.jsx";
import { searchCity } from "../services/geocode.js";

export default function LocationPicker() {
  const { location, setLocation, locateMe, locating, geoError } = usePlace();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const search = async (e) => {
    e.preventDefault();
    if (q.trim().length < 2) return;
    setBusy(true);
    setMsg("");
    try {
      const r = await searchCity(q.trim());
      setResults(r);
      if (!r.length) setMsg("Nenhuma cidade encontrada.");
    } catch {
      setMsg("Não foi possível buscar agora.");
    } finally {
      setBusy(false);
    }
  };

  const pick = (place) => {
    setLocation(place);
    setOpen(false);
    setResults([]);
    setQ("");
  };

  return (
    <div className="card">
      <div className="loc">
        <div>
          <span className="muted">Você está vendo</span>
          <p><b>{location.label}</b></p>
        </div>
        <button className="ghost sm" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? "Fechar" : "Alterar"}</button>
      </div>

      {open && (
        <div className="mt8">
          <button className="full" onClick={() => { locateMe(); setOpen(false); }} disabled={locating}>
            {locating ? "Localizando…" : "Usar minha localização"}
          </button>
          <form onSubmit={search} className="mt8">
            <label htmlFor="city" className="muted nomargin">Ou busque uma cidade</label>
            <input id="city" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex.: Recife" />
            <button className="full mt8" disabled={busy}>{busy ? "Buscando…" : "Buscar"}</button>
          </form>
          {msg && <p className="muted mt8">{msg}</p>}
          <div className="results">
            {results.map((r) => (
              <button key={`${r.lat},${r.lon}`} onClick={() => pick(r)}>{r.label}</button>
            ))}
          </div>
        </div>
      )}
      {geoError && <p className="muted mt8" role="alert">{geoError}</p>}
    </div>
  );
}
