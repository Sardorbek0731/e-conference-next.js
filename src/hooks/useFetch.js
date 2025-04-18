"use client";

import { useEffect, useState, useCallback } from "react";

export function useFetch(fetchType) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetchType();
      const formattedData = response.map((item) => {
        const date = new Date(item.createdAt.seconds * 1000);
        return {
          ...item,
          addedTime: date
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/,/, ""),
        };
      });

      setData(formattedData);
    } catch (err) {
      setError(err.message || "Ma'lumotlarni olishda xatolik yuz berdi");
    } finally {
      setIsPending(false);
    }
  }, [fetchType]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { data, isPending, error, fetchArticles };
}
