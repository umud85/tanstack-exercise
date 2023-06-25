import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import createWrapper from "@/testUtils/createWrapper";
import Home from "@/src/app/page";

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
};

test("<Home /> - render loading state", async () => {
  render(<Home />, {
    wrapper: createWrapper()
  });
  await waitFor(() => screen.getByText("Todo-List-App"));
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(() => waitForElementToBeRemoved(screen.queryByText("Loading...")));
  expect(screen.getByText(/go shopping/i)).toBeInTheDocument();
  expect(screen.getByText(/walk the dog/i)).toBeInTheDocument();
  expect(screen.getByText(/exercise/i)).toBeInTheDocument();
  screen.debug();
});