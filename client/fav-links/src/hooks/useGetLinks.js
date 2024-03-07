import { useEffect, useRef, useState } from 'react';

export function useGetLinks(id) {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(false);
  const loading = useRef();

  useEffect(() => {
    loading.current = true;
    fetch(`http://localhost:3000/links/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setLinks(json);
      })
      .catch(() => setError(true))
      .finally(() => (loading.current = false));
  }, [id]);

  return { links, error, loading };
}
