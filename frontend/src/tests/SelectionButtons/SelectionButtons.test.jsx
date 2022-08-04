import { screen } from "@testing-library/react";

import SelectionButtons from "../../components/SelectionButtons";
import renderWithContext from "../customRenderWithContext";

describe("Selection Button component", () => {
  test("buttons snapshot", () => {
    const viewTriangleButtons = renderWithContext(<SelectionButtons />);
    expect(viewTriangleButtons).toMatchSnapshot();
  });
  test("text in component", () => {
    renderWithContext(<SelectionButtons />);
    expect(screen.getByText(/make your choice/i)).toBeInTheDocument();
  });
});
