import { useState } from "react";
import LocationPicker from "../components/LocationPicker.jsx";
import { ALERTS as DEMO_ALERTS } from "../data.js";
import { useWeather } from "../hooks/useWeather.js";
import { useAlerts } from "../hooks/useAlerts.js";
import { usePlace } from "../LocationContext.jsx";

export default function Home() {
  const { location } = usePlace();
  const { status, loading, error, reload } = useWeather();
  const { official, loading: loadingAlerts } = useAlerts();
  const [msg, setMsg] = useState("");

  const usingOfficial = official.length > 0;
  const alerts = usingOfficial ? official : DEMO_ALERTS;

  // Compartilha "estou bem" pelo menu nativo do celular (WhatsApp, SMS...). Nada é enviado a um servidor.
  const shareSafe = async () => {
    const link = location.source === "gps" ? ` https://maps.google.com/?q=${location.lat},${location.lon}` : "";
    const text = `Estou em segurança. Local: ${location.label}.${link}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setMsg("Mensagem copiada. Cole no WhatsApp ou SMS.");
      }
    } catch { /* o usuário cancelou */ }
  };

  return (
    <>
      <h1>Alerta Cidadão</h1>
      <p className="muted">Clima e emergências na sua região.</p>
      <div className="mt8" />
      <LocationPicker />

      {!status && loading && <div className="status skeleton" aria-busy="true">Carregando previsão…</div>}

      {!status && !loading && (
        <div className="status" role="alert">
          <b>Previsão indisponível</b>
          <p>{error || "Tente novamente em instantes."}</p>
          <button className="ghost mt8" onClick={reload}>Tentar de novo</button>
        </div>
      )}

      {status && (
        <div className={status.level === "ok" ? "status ok" : "status"} role="status">
          <b>{status.title}</b>
          <p>{status.text}</p>
          <p className="muted mt8">Agora: {status.temp} °C{loading ? " · atualizando…" : ""}</p>
          {error && <p className="muted mt8">{error} Exibindo o último dado.</p>}
        </div>
      )}

      <button className="full" onClick={shareSafe}>Avisar que estou bem</button>
      {msg && <p className="muted mt8">{msg}</p>}

      <h2>Avisos para a região</h2>
      {!loadingAlerts && !usingOfficial && (
        <p className="muted mt8">Alertas oficiais não configurados. Exibindo exemplos de demonstração.</p>
      )}
      <div className="mt8" />
      {alerts.map((a) => (
        <div className="card" key={a.id}>
          <span className="chip">{a.category}</span>
          <p><b>{a.title}</b></p>
          <p className="muted">{a.text} <i>({a.when})</i></p>
        </div>
      ))}
    </>
  );
}
