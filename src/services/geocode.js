// Busca de cidades pelo nome (API de geocodificação do Open-Meteo, gratuita e sem chave).
export async function searchCity(name) {
  const params = new URLSearchParams({ name, count: 5, language: "pt", format: "json" });
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  if (!res.ok) throw new Error("Busca falhou");
  const json = await res.json();
  return (json.results ?? []).map((r) => ({
    lat: r.latitude,
    lon: r.longitude,
    label: [r.name, r.admin1, r.country].filter(Boolean).join(", "),
    source: "search",
  }));
}
