import App from "./App";
import { render, screen, userEvent } from "./test/test-utils";

describe("Simple working test", () => {
  test("the title is visible", () => {
    render(<App />);
  });
});
