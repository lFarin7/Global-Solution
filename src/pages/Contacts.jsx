import { CONTACTS } from "../data.js";

export default function Contacts() {
  return (
    <>
      <h1>Contatos de emergência</h1>
      <p className="muted">Toque para ligar.</p>
      <div className="mt18" />
      {CONTACTS.map((c) => (
        <div className="card phone" key={c.number}>
          <div>
            <b>{c.name}</b>
            <p className="muted">{c.text}</p>
          </div>
          <a className="btn ghost" href={`tel:${c.number}`} aria-label={`Ligar para ${c.name}`}>
            <strong>{c.number}</strong>
          </a>
        </div>
      ))}
    
    </>
  );
}
