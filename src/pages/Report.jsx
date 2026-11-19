import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReports } from "../ReportsContext.jsx";
import { usePlace } from "../LocationContext.jsx";
import { REPORT_TYPES } from "../data.js";
import Toast from "../components/Toast.jsx";

export default function Report() {
  const { addReport, shared } = useReports();
  const { location } = usePlace();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const [sending, setSending] = useState(false);

  const say = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  };

  const submit = async () => {
    if (!type) return say("Escolha o tipo de ocorrência.");
    setSending(true);
    try {
      await addReport({ type, text: text.trim().slice(0, 300) });
      say("Relato enviado.");
      setTimeout(() => navigate("/perto"), 700);
    } catch {
      say("Não foi possível enviar. Tente de novo.");
      setSending(false);
    }
  };

  return (
    <>
      <h1>Reportar ocorrência</h1>
      <p className="muted">Ajude quem está por perto a saber o que está acontecendo.</p>

      <div className="card mt18">
        <span className="muted">O relato será publicado perto de</span>
        <p><b>{location.label}</b> <Link to="/">Alterar</Link></p>
        <p className="muted">A posição é arredondada (cerca de 100 m) para proteger sua privacidade.</p>
      </div>

      <label>O que está acontecendo?</label>
      <div className="types">
        {REPORT_TYPES.map((t) => (
          <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>
        ))}
      </div>

      <label htmlFor="desc">Detalhes (opcional)</label>
      <textarea id="desc" rows={3} maxLength={300} value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Ex.: água na altura do tornozelo na esquina da praça" />

      <button className="full mt18" onClick={submit} disabled={sending}>{sending ? "Enviando…" : "Enviar relato"}</button>
      {!shared && <p className="muted mt8">Modo local: só você verá este relato neste aparelho.</p>}
      <Toast message={toast} />
    </>
  );
}
