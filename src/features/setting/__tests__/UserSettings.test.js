import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routesConfig from "../../../routesConfig";
// Redux
import { Provider } from "react-redux";
import store from "../../../redux/store";
// APIs
import * as authAPI from "../../../apis/authAPI";
import * as userAPI from "../../../apis/userAPI";
import * as bookAPI from "../../../apis/bookAPI";
import * as tradeAPI from "../../../apis/tradeAPI";
// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/bookAPI");
jest.mock("../../../apis/tradeAPI");
window.scrollTo = jest.fn();

describe("----- <UserSettings/> -----", () => {
  beforeEach(() => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: testUser
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly updates account information", async () => {
    // Mock API functions
    userAPI.editUser.mockResolvedValue({
      data: { success: true }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/settings"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("userSettingsForm-fullName"), "FullName1");
    userEvent.type(screen.getByTestId("userSettingsForm-city"), "City1");
    userEvent.type(screen.getByTestId("userSettingsForm-state"), "State1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(authAPI.getUser).toHaveBeenCalled();
      expect(userAPI.editUser).toHaveBeenCalledWith(testUser._id, "FullName1", "City1", "State1");
      expect(screen.getByText("Information updated")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly deletes user account", async () => {
    // Mock API functions
    tradeAPI.deleteForUser.mockResolvedValue({
      data: { success: true }
    });

    bookAPI.deleteForUser.mockResolvedValue({
      data: { success: true }
    });

    userAPI.deleteUser.mockResolvedValue({
      data: { success: true }
    });

    authAPI.logout.mockResolvedValue({
      data: { success: true }
    });

    // Other mocks
    window.confirm = jest.fn(() => true);

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/settings"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Delete", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Delete", { selector: "button" }));

    await waitFor(() => {
      expect(authAPI.getUser).toHaveBeenCalled();
      expect(tradeAPI.deleteForUser).toHaveBeenCalledWith(testUser._id);
      expect(bookAPI.deleteForUser).toHaveBeenCalledWith(testUser._id);
      expect(userAPI.deleteUser).toHaveBeenCalledWith(testUser._id);
      expect(authAPI.logout).toHaveBeenCalled();
      expect(screen.getByText("Account deleted")).toBeInTheDocument();
    });
  });
});
