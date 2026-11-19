import { useEffect, useState } from "react";
import { fetchAlerts } from "../services/alerts.js";
import { usePlace } from "../LocationContext.jsx";

export function useAlerts() {
  const { location } = usePlace();
  const { lat, lon } = location;
  const [official, setOfficial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchAlerts({ lat, lon })
      .then((list) => alive && setOfficial(list))
      .catch(() => alive && setOfficial([])) // sem backend ou sem chave: cai nos exemplos
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [lat, lon]);

  return { official, loading };
}
