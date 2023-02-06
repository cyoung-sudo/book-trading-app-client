import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import UserSettingsForm from "../UserSettingsForm";

describe("----- <UserSettingsForm/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock props
    const mockSetFullName = jest.fn();
    const mockSetCity = jest.fn();
    const mockSetState = jest.fn();
    const mockHandleSubmit = jest.fn(e => e.preventDefault());

    render(
      <UserSettingsForm
        setFullName={ mockSetFullName }
        setCity={ mockSetCity}
        setState={ mockSetState }
        handleSubmit={ mockHandleSubmit }/>
    );

    await waitFor(() => {
      expect(screen.getByTestId("userSettingsForm-fullName")).toBeInTheDocument();
      expect(screen.getByTestId("userSettingsForm-city")).toBeInTheDocument();
      expect(screen.getByTestId("userSettingsForm-state")).toBeInTheDocument();
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("userSettingsForm-fullName"), "FullName1");
    userEvent.type(screen.getByTestId("userSettingsForm-city"), "City1");
    userEvent.type(screen.getByTestId("userSettingsForm-state"), "State1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(mockSetFullName).toHaveBeenCalledWith("FullName1");
      expect(mockSetCity).toHaveBeenCalledWith("City1");
      expect(mockSetState).toHaveBeenCalledWith("State1");
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
