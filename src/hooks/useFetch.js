import { useEffect, useState } from "react";

/**
 * Generic data-fetching hook.
 * fetcher: (signal) => Promise<T>
 * deps: dependency array that re-triggers the fetch
 *
 * Returns { data, status } where status is "idle" | "loading" | "success" | "error"
 * Cancels the in-flight request on unmount / dependency change (the cleanup
 * function returned from the effect).
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // ignore cancelled requests
        setError(err.message || "Something went wrong");
        setStatus("error");
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, status, error };
}
