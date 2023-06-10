import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/getQueryClient';
import { getTodos } from '@/app/page';
import Todos from '@/components/todos';

export default async function HydratedTodos() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['todos'], getTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Todos />
    </Hydrate>
  );
}