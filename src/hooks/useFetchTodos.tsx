import getTodos from '@/src/services/getTodos';
import { useQuery } from '@tanstack/react-query';

export default function useFetchTodos(props) {
    const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialData: props.todos,
    });
  
  return ({
    todos,
  });
}