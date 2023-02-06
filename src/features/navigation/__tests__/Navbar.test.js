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
// Data
import { testUser } from "../../../data/userTestData";

// Mocks
jest.mock("../../../apis/authAPI");
window.scrollTo = jest.fn();

describe("----- <Navbar/> -----", () => {
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
  it("correctly logs user out", async () => {
    // Mock API functions
    authAPI.logout.mockResolvedValue({
      data: { success: true }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => expect(screen.getByText("Logout")).toBeInTheDocument());

    userEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(authAPI.logout).toHaveBeenCalled();
      expect(screen.getByText("Successfully logged-out")).toBeInTheDocument();
    });
  });
});
