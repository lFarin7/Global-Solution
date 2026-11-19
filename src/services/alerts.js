// Chama a SUA função serverless (api/alerts.js), que guarda a chave do Google em segredo.
export async function fetchAlerts({ lat, lon }) {
  const res = await fetch(`/api/alerts?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Alertas oficiais indisponíveis");
  const json = await res.json();

  // Nomes de campos conforme a documentação da Weather API (publicAlerts).
  // Se algo aparecer vazio, rode console.log(json) uma vez e ajuste.
  const list = json.weatherAlerts ?? json.alerts ?? [];
  return list.map((a, i) => ({
    id: a.id ?? i,
    category: a.eventType ?? "Alerta",
    title: a.alertTitle?.text ?? a.alertTitle ?? a.eventType ?? "Alerta oficial",
    text: a.description ?? a.instruction ?? "",
    when: a.areaName ?? "fonte oficial",
  }));
}
