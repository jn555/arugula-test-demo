import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log to verify the structurez
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        console.error("Error fetching data:", err.message || err);
        setError(err.message);
      });
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
