import { GUIDES } from "../data.js";

export default function Guide() {
  return (
    <>
      <h1>Guia de segurança</h1>
      <p className="muted">O que fazer antes e durante cada situação. Siga sempre as instruções da Defesa Civil local.</p>
      <div className="mt18" />
      {GUIDES.map((g) => (
        <details className="card" key={g.id}>
          <summary><b>{g.title}</b></summary>
          <ul>
            {g.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </details>
      ))}
    </>
  );
}
