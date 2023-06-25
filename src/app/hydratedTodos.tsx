import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/src/app/getQueryClient';
import getTodos from '@/src/app/page';
import Todos from '@/src/components/todos';

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