import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import AuthForm from "../AuthForm";

describe("----- <AuthForm/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock props
    const mockSetUsername = jest.fn();
    const mockSetPassword = jest.fn();
    const mockHandleSubmit = jest.fn(e => e.preventDefault());

    render(
      <AuthForm
        setUsername={ mockSetUsername }
        setPassword={ mockSetPassword }
        handleSubmit={ mockHandleSubmit }/>
    );

    await waitFor(() => {
      expect(screen.getByTestId("authForm-username")).toBeInTheDocument();
      expect(screen.getByTestId("authForm-password")).toBeInTheDocument();
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(mockSetUsername).toHaveBeenCalledWith("User1");
      expect(mockSetPassword).toHaveBeenCalledWith("Pass1");
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
