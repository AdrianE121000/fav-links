import { useEffect, useState } from 'react';

export function useGetLinks(id) {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/links/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setLinks(json);
      })
      .catch(() => setError(true));
  }, [id]);

  return { links, error };
}
