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

describe("----- <Signup/> -----", () => {
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
  it("correctly submits form data", async () => {
    // Mock API functions
    authAPI.signup.mockResolvedValue({
      data: { success: true }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument()
    });

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    
    await waitFor(() => {
      expect(authAPI.signup).toHaveBeenCalledWith("User1", "Pass1");
      expect(screen.getByText("Successfully signed-up")).toBeInTheDocument();
    });
  }),

  //----- Test 2 -----
  it("correctly handles empty username field", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument()
    });

    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    
    await waitFor(() => {
      expect(authAPI.signup).not.toHaveBeenCalled();
      expect(screen.getByText("No username provided")).toBeInTheDocument();
    });
  }),

  //----- Test 3 -----
  it("correctly handles empty password field", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument()
    });

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    
    await waitFor(() => {
      expect(authAPI.signup).not.toHaveBeenCalled();
      expect(screen.getByText("No password provided")).toBeInTheDocument();
    });
  })
});
