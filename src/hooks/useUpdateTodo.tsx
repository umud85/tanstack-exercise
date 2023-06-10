import { Todo } from "@/components/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';


export default function useUpdateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (todo: Todo) => {
      return axios.put(`http://localhost:3001/todos/${todo.id}`, todo)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['todos']);
    }
  });
  return mutation;
}