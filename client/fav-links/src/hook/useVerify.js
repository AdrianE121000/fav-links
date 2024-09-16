import { useEffect, useState } from "react";

export function useVerify({ token }) {
  const [logged, setLogged] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/users/verify/${token}`).then((res) => {
      if (res.status === 401) {
        setLogged(false);
      } else {
        setLogged(true);
      }
    });
  }, [token]);

  return { logged, setLogged };
}
