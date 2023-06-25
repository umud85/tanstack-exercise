import getTodos from '@/src/services/getTodos';
import { useQuery } from '@tanstack/react-query';

export default function useFetchTodos() {
    const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    });
  
  return ({
    todos,
  });
}