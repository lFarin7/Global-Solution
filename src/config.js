// Local inicial até o usuário escolher uma cidade ou ativar o GPS.
export const DEFAULT_LOCATION = { lat: -23.55, lon: -46.63, label: "São Paulo, SP", source: "default" };

// Limites que transformam números da previsão em avisos. Ajuste com a Defesa Civil da sua região.
export const THRESHOLDS = {
  rain3hAlert: 20,  // mm em 3 h => "Chuva forte"
  rain3hWatch: 8,   // mm em 3 h => "Chuva moderada"
  heatApparent: 35, // °C de sensação térmica => "Calor extremo"
};

export const NEARBY_RADIUS_KM = 25;      // raio da aba "Perto de mim"
export const REPORT_TTL_HOURS = 24;      // relatos mais antigos que isso somem da lista
export const REFRESH_MS = 15 * 60 * 1000; // atualiza a previsão a cada 15 min
