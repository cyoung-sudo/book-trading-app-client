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

describe("----- <Login/> -----", () => {
  beforeEach(() => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: false,
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
    authAPI.login.mockResolvedValue({
      data: {
        success: true,
        user: testUser
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/login"],
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
      expect(authAPI.login).toHaveBeenCalledWith("User1", "Pass1");
      expect(screen.getByText("Successfully logged-in")).toBeInTheDocument();
    })
  });

  //----- Test 2 -----
  it("correctly handles empty username field", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/login"],
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
      expect(authAPI.login).not.toHaveBeenCalled();
      expect(screen.getByText("No username provided")).toBeInTheDocument();
    });
  });

  //----- Test 3 -----
  it("correctly handles empty password field", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/login"],
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
      expect(authAPI.login).not.toHaveBeenCalled();
      expect(screen.getByText("No password provided")).toBeInTheDocument();
    });
  });
});
