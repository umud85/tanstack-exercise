import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import createWrapper from "@/testUtils/createWrapper";
import Todos from "@/src/components/todos";
import useFetchTodos from "@/src/hooks/useFetchTodos";

jest.mock("../../../src/hooks/useFetchTodos");

const todos = [
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
];

test("renders loading state", async () => {
  (useFetchTodos as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
  });
  render(<Todos />, {
    wrapper: createWrapper(),
  });
  await screen.findByText(/loading/i);
});

test("renders error state", async () => {
  (useFetchTodos as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    error: new Error("Error"),
  });
  render(<Todos />, {
    wrapper: createWrapper(),
  });
  await screen.findByText(/error/i);
});

test("renders success state", async () => {
  (useFetchTodos as jest.Mock).mockReturnValue({
    data: todos,
    isLoading: false,
    isError: false,
    error: null,
  });
  render(<Todos />, {
    wrapper: createWrapper(),
  });
  expect(screen.getByText(/go shopping/i)).toBeInTheDocument();
  expect(screen.getByText(/walk the dog/i)).toBeInTheDocument();
  expect(screen.getByText(/exercise/i)).toBeInTheDocument();
  screen.debug();
});
