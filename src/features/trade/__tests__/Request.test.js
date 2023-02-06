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
import { testUser, testUser2 } from "../../../data/userTestData";
import { testBooks } from "../../../data/bookTestData";

const mockTestUser2 = testUser2;

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/bookAPI");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { 
      recipientUsername: mockTestUser2.username,
      recipientId: mockTestUser2._id
    }
  })
}));
window.scrollTo = jest.fn();

describe("----- <Request/> -----", () => {
  beforeEach(() => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: testUser
      }
    });

    bookAPI.getForUser.mockResolvedValue({
      data: {
        success: true,
        books: testBooks
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly requests a book", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/trades/request"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Request", { selector: "button" })).toHaveLength(3)
    });

    userEvent.click(screen.getAllByText("Request", { selector: "button" })[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId("pendingTradeDisplay-book")).toHaveLength(1);
      expect(screen.getAllByText(testBooks[0].title)).toHaveLength(2);
      expect(screen.getByText("Book requested")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly removes a requested book", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/trades/request"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Request", { selector: "button" })).toHaveLength(3)
    });

    userEvent.click(screen.getAllByText("Request", { selector: "button" })[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId("pendingTradeDisplay-book")).toHaveLength(1);
    });

    userEvent.click(screen.getAllByTestId("pendingTradeDisplay-remove")[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("pendingTradeDisplay-book")).toHaveLength(0);
    });
  });

  //----- Test 3 -----
  it("correctly submits request", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/trades/request"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Request", { selector: "button" })).toHaveLength(3)
    });

    userEvent.click(screen.getAllByText("Request", { selector: "button" })[0]);

    await waitFor(() => {
      expect(screen.getByText("Offer", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Offer", { selector: "button" }));

    await waitFor(() => {
      expect(screen.getByText("Trade Offer")).toBeInTheDocument();
    });
  });
});
