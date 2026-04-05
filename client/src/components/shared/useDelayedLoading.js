import { useEffect, useState } from "react";

/** Simulates initial fetch; keeps table skeleton visible briefly. */
export function useDelayedLoading(ms = 400) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}
