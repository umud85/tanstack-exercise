import getTodos from '@/src/services/getTodos';
import { useQuery } from '@tanstack/react-query';

export default function useFetchTodos() {
    const query = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    });
  
  return (query);
}