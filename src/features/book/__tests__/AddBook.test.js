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
import * as bookAPI from "../../../apis/bookAPI";
// Data
import { testUser } from "../../../data/userTestData";
import { testBook } from "../../../data/bookTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/bookAPI");
window.scrollTo = jest.fn();

describe("----- <AddBook/> -----", () => {
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
    bookAPI.create.mockResolvedValue({
      data: { 
        success: true,
        book: testBook
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/books/new"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument()
    });

    userEvent.type(screen.getByTestId("bookForm-title"), "Title1");
    userEvent.type(screen.getByTestId("bookForm-description"), "Desc1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));

    await waitFor(() => {
      expect(authAPI.getUser).toHaveBeenCalled();
      expect(bookAPI.create).toHaveBeenCalledWith("Title1", "Desc1", testUser.username, testUser._id);
      expect(screen.getByText("Book created")).toBeInTheDocument();
    })
  });

  //----- Test 2 -----
  it("correctly handles empty title field", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/books/new"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument()
    });

    userEvent.type(screen.getByTestId("bookForm-description"), "Desc1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    
    await waitFor(() => {
      expect(bookAPI.create).not.toHaveBeenCalled();
      expect(screen.getByText("No title provided")).toBeInTheDocument();
    });
  });

  //----- Test 3 -----
  it("correctly handles empty description field", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/", "/books/new"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Submit", { selector: "input" })).toBeInTheDocument()
    });

    userEvent.type(screen.getByTestId("bookForm-title"), "Title1");
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    
    await waitFor(() => {
      expect(bookAPI.create).not.toHaveBeenCalled();
      expect(screen.getByText("No description provided")).toBeInTheDocument();
    });
  });
});
