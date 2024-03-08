import { useGetLinks } from '../hooks/useGetLinks';
import { Card } from './Card';

export function Home() {
  const userId = localStorage.getItem('userID');
  const { links, loading, error } = useGetLinks(userId);

  return (
    <div>
      {loading.current ? (
        <h1>cargando</h1>
      ) : error ? (
        <h1>se produjo en error</h1>
      ) : (
        <Card links={links} />
      )}
    </div>
  );
}
