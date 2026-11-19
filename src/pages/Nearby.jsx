import { Link } from "react-router-dom";
import { useReports } from "../ReportsContext.jsx";
import { usePlace } from "../LocationContext.jsx";
import { NEARBY_RADIUS_KM, REPORT_TTL_HOURS } from "../config.js";
import { formatKm, timeAgo } from "../utils.js";

export default function Nearby() {
  const { reports, loading, shared } = useReports();
  const { location } = usePlace();

  return (
    <>
      <h1>Perto de mim</h1>
      <p className="muted">
        Relatos das últimas {REPORT_TTL_HOURS} h em até {NEARBY_RADIUS_KM} km de <b>{location.label}</b>.
      </p>
      {!shared && <p className="muted mt8">Modo local: aparecem só os relatos feitos neste aparelho.</p>}

      <h2>Relatos</h2>
      {loading && <p className="muted">Carregando…</p>}
      {!loading && reports.length === 0 && (
        <div className="card">
          <p><b>Nenhum relato por perto.</b></p>
          <p className="muted">Boa notícia, ou ninguém avisou ainda. <Link to="/reportar">Fazer um relato</Link></p>
        </div>
      )}
      {reports.map((r) => (
        <div className="card" key={r.id}>
          <span className="chip blue">{r.type}</span>
          <p className="muted">a {formatKm(r.km)} · {timeAgo(r.at)}</p>
          {r.text && <p>{r.text}</p>}
        </div>
      ))}
    </>
  );
}
