import { useCallback, useEffect, useState } from "react";
import { getForecast, toStatus } from "../services/weather.js";
import { usePlace } from "../LocationContext.jsx";
import { REFRESH_MS } from "../config.js";

export function useWeather() {
  const { location } = usePlace();
  const { lat, lon } = location;
  const [state, setState] = useState({ status: null, loading: true, error: "" });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const data = await getForecast({ lat, lon });
      setState({ status: toStatus(data), loading: false, error: "" });
    } catch {
      // Mantém o último status válido e só avisa que não conseguiu atualizar.
      setState((s) => ({ ...s, loading: false, error: "Não foi possível atualizar a previsão." }));
    }
  }, [lat, lon]);

  useEffect(() => {
    setState({ status: null, loading: true, error: "" }); // local mudou: não mostra a previsão do lugar antigo
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  return { ...state, reload: load };
}
