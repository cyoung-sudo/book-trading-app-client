import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import BookForm from "../BookForm";

describe("----- <BookForm/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock props
    const mockSetTitle = jest.fn();
    const mockSetDescription = jest.fn();
    const mockHandleSubmit = jest.fn(e => e.preventDefault());

    render(
      <BookForm
        setTitle={ mockSetTitle }
        setDescription={ mockSetDescription }
        handleSubmit={ mockHandleSubmit }/>
    );

    await waitFor(() => {
      expect(screen.getByTestId("bookForm-title")).toBeInTheDocument();
      expect(screen.getByTestId("bookForm-description")).toBeInTheDocument();
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("bookForm-title"), "Title1");
    userEvent.type(screen.getByTestId("bookForm-description"), "Desc1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(mockSetTitle).toHaveBeenCalledWith("Title1");
      expect(mockSetDescription).toHaveBeenCalledWith("Desc1");
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
