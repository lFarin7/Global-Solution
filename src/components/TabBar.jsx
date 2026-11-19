import { NavLink } from "react-router-dom";

// Cada aba: rota, texto e o desenho (paths SVG). Para trocar ou adicionar abas, edite só esta lista.
const tabs = [
  { to: "/", label: "Início", paths: ["M3 11l9-8 9 8M5 10v10h14V10"] },
  { to: "/reportar", label: "Reportar", paths: ["M12 5v14M5 12h14"] },
  { to: "/perto", label: "Perto", paths: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M12 8a4 4 0 100 8 4 4 0 000-8z"] },
  { to: "/guia", label: "Guia", paths: ["M4 4h12a3 3 0 013 3v13H7a3 3 0 01-3-3z", "M4 17a3 3 0 013-3h12"] },
  { to: "/contatos", label: "Ligar", paths: ["M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"] },
];

export default function TabBar() {
  return (
    <nav className="tabs" aria-label="Seções">
      {tabs.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.to === "/"} className={({ isActive }) => (isActive ? "tab active" : "tab")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {t.paths.map((d) => <path key={d} d={d} />)}
          </svg>
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
