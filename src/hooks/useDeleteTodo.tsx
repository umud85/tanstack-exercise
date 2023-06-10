import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`http://localhost:3001/todos/${id}`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['todos']);
    }
  });
  return mutation;
}