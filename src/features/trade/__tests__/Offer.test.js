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
import * as tradeAPI from "../../../apis/tradeAPI";
// Data
import { testUser, testUser2 } from "../../../data/userTestData";
import { testBooks } from "../../../data/bookTestData";
import { testPendingTrades } from "../../../data/pendingTradeTestData";

const mockTestUser2 = testUser2;
const mockTestPendingTrades = testPendingTrades;

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/bookAPI");
jest.mock("../../../apis/tradeAPI");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { 
      recipientUsername: mockTestUser2.username,
      recipientId: mockTestUser2._id,
      requests: []
    }
  })
}));
window.scrollTo = jest.fn();

describe("----- <Offer/> -----", () => {
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
  it("correctly offers a book", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/trades/offer"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Offer", { selector: "button" })).toHaveLength(3)
    });

    userEvent.click(screen.getAllByText("Offer", { selector: "button" })[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId("pendingTradeDisplay-book")).toHaveLength(1);
      expect(screen.getAllByText(testBooks[0].title)).toHaveLength(2);
      expect(screen.getByText("Book offered")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly removes an offered book", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/trades/offer"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Offer", { selector: "button" })).toHaveLength(3)
    });

    userEvent.click(screen.getAllByText("Offer", { selector: "button" })[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId("pendingTradeDisplay-book")).toHaveLength(1);
    });

    userEvent.click(screen.getAllByTestId("pendingTradeDisplay-remove")[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("pendingTradeDisplay-book")).toHaveLength(0);
    });
  });

  //----- Test 3 -----
  it("correctly submits offer", async () => {
    // Mock API functions
    tradeAPI.create.mockResolvedValue({
      data: { 
        success: true,
        trade: {}
      }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/trades/offer"],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Offer", { selector: "button" })).toHaveLength(3)
    });

    userEvent.click(screen.getAllByText("Offer", { selector: "button" })[0]);

    await waitFor(() => {
      expect(screen.getByText("Trade", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Trade", { selector: "button" }));

    await waitFor(() => {
      expect(tradeAPI.create).toHaveBeenCalledWith(
        testUser.username,
        testUser._id,
        [
          {
            bookId: testBooks[0]._id,
            bookTitle: testBooks[0].title
          }
        ],
        testUser2.username,
        testUser2._id,
        []
      );
      expect(screen.getByText("Trade Offer")).toBeInTheDocument();
    });
  });
});
