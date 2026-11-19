
export default async function handler(req, res) {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return res.status(400).json({ error: "lat e lon inválidos" });
  }
  if (!process.env.GOOGLE_WEATHER_KEY) {
    return res.status(501).json({ error: "GOOGLE_WEATHER_KEY não configurada" });
  }

  const url =
    "https://weather.googleapis.com/v1/publicAlerts:lookup" +
    `?key=${process.env.GOOGLE_WEATHER_KEY}` +
    `&location.latitude=${lat}&location.longitude=${lon}&languageCode=pt-BR`;

  try {
    const r = await fetch(url);
    const body = await r.json();
    // Cache de 5 min: reduz custo e protege a cota quando muitos tentarem abrir o app pra testar.
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(r.ok ? 200 : r.status).json(body);
  } catch {
    return res.status(502).json({ error: "falha ao consultar o provedor" });
  }
}
