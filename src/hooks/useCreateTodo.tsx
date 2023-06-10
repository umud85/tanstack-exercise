import { Todo } from '@/components/todos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


export default function useCreateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newTodo: Todo) => {
      return axios.post('http://localhost:3001/todos', newTodo);
     },
     onSuccess: async () => {
      queryClient.invalidateQueries(['todos']);
    }
   });
  return mutation;
}