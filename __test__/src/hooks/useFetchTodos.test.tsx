import { renderHook, waitFor } from "@testing-library/react";
import createWrapper from "@/testUtils/test-wrapper";
import useFetchTodos from "@/src/hooks/useFetchTodos";

const todos = {
  "todos": [
    {
      "id": "1",
      "title": "Go shopping",
      "done": false
    },
    {
      "id": "2",
      "title": "Walk the dog",
      "done": false
    },
    {
      "id": "f1a82176-9197-4c61-b9bd-201478facbaf",
      "title": "Exercise",
      "done": false
    }
  ]
}


test("my first test", async () => {
  const { result } = renderHook(() => useFetchTodos(todos), {
    wrapper: createWrapper()
  });
  await waitFor(() => result.current);
  expect(result.current).toEqual(todos);
});