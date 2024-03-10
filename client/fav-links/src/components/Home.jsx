import { useGetLinks } from '../hooks/useGetLinks';
import { Card } from './Card';

export function Home() {
  const userId = localStorage.getItem('userID');
  const { links, error } = useGetLinks(userId);

  return (
    <div>{error ? <h1>se produjo en error</h1> : <Card links={links} />}</div>
  );
}
