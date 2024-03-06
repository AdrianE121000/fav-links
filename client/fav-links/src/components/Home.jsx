import { useGetLinks } from '../hooks/useGetLinks';
import { deleteLink } from '../lib/data';
import { Card } from './Card';

export function Home() {
  const userId = localStorage.getItem('userID');
  const { links, loading, error } = useGetLinks({ userId });

  async function onDelete(id) {
    await deleteLink({ id });
  }
  function onEdit() {}

  return (
    <div>
      {loading.current ? (
        <h1>cargando</h1>
      ) : error ? (
        <h1>se produjo en error</h1>
      ) : (
        <Card
          links={links}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}
