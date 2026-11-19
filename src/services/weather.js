import { THRESHOLDS } from "../config.js";

// Open-Meteo: gratuito para uso não comercial e sem chave de API.
export async function getForecast({ lat, lon }) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: "temperature_2m",
    hourly: "precipitation,apparent_temperature",
    forecast_days: 2,
    timezone: "America/Sao_Paulo",
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`Open-Meteo respondeu ${res.status}`);
  return res.json();
}

const sum = (arr) => arr.reduce((a, b) => a + (b ?? 0), 0);

// Converte a previsão bruta em um status que a tela sabe mostrar.
export function toStatus(data) {
  // Procura a hora atual dentro do horário da API, não do aparelho (evita erro de fuso).
  const hour = data.current.time.slice(0, 13);
  const i = Math.max(0, data.hourly.time.findIndex((t) => t.startsWith(hour)));

  const rain = sum(data.hourly.precipitation.slice(i, i + 3));
  const heat = Math.max(...data.hourly.apparent_temperature.slice(i, i + 6));
  const temp = Math.round(data.current.temperature_2m);

  if (rain >= THRESHOLDS.rain3hAlert)
    return { level: "alto", title: "Atenção: chuva forte", text: `${rain.toFixed(0)} mm previstos nas próximas 3 horas. Risco de alagamento. Evite áreas baixas e margens de rios.`, temp };
  if (heat >= THRESHOLDS.heatApparent)
    return { level: "alto", title: "Atenção: calor extremo", text: `Sensação térmica de até ${Math.round(heat)} °C nas próximas horas. Hidrate-se e procure locais com sombra ou ar-condicionado.`, temp };
  if (rain >= THRESHOLDS.rain3hWatch)
    return { level: "alto", title: "Chuva moderada a caminho", text: `${rain.toFixed(0)} mm previstos nas próximas 3 horas. Leve guarda-chuva.`, temp };
  return { level: "ok", title: "Sem alertas agora", text: "Condições normais na sua região nas próximas horas.", temp };
}
