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
import { testBooks } from "../../../data/bookTestData";
import { testTrades } from "../../../data/tradeTestData";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/bookAPI");
jest.mock("../../../apis/tradeAPI");
window.scrollTo = jest.fn();

describe("----- <UserProfile/> -----", () => {
  beforeEach(() => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: testUser
      }
    });

    userAPI.getUser.mockResolvedValue({
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

    tradeAPI.getForInitiator.mockResolvedValue({
      data: {
        success: true,
        trades: testTrades
      }
    });

    tradeAPI.getForRecipient.mockResolvedValue({
      data: {
        success: true,
        trades: testTrades
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly deletes a book", async () => {
    // Mock API functions
    tradeAPI.deleteRelated.mockResolvedValue({
      data: { success: true }
    });

    bookAPI.deleteBook.mockResolvedValue({
      data: { success: true }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/users/${testUser._id}`],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Delete", { selector: "button" })).toHaveLength(3);
    });

    userEvent.click(screen.getAllByText("Delete", { selector: "button" })[0]);

    await waitFor(() => {
      expect(tradeAPI.deleteRelated).toHaveBeenCalledWith(testBooks[0]._id);
      expect(bookAPI.deleteBook).toHaveBeenCalledWith(testBooks[0]._id);
      expect(screen.getByText("Book deleted")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly accepts a trade", async () => {
    // Mock API functions
    bookAPI.updateBook.mockResolvedValue({
      data: { success: true }
    });

    tradeAPI.deleteRelated.mockResolvedValue({
      data: { success: true }
    });
    
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/users/${testUser._id}`],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Offers", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Offers", { selector: "button" }));

    await waitFor(() => {
      expect(screen.getAllByText("Accept", { selector: "button" })).toHaveLength(2);
    });

    userEvent.click(screen.getAllByText("Accept", { selector: "button" })[0]);

    await waitFor(() => {
      expect(bookAPI.updateBook).toHaveBeenCalled();
      expect(tradeAPI.deleteRelated).toHaveBeenCalled();
      expect(screen.getByText("Trade accepted")).toBeInTheDocument();
    });
  });

  //----- Test 3 -----
  it("correctly declines a trade", async () => {
    // Mock API functions
    tradeAPI.deleteTrade.mockResolvedValue({
      data: { success: true }
    });
    
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/users/${testUser._id}`],
    });
  
    render(
      <Provider store={ store }>
        <RouterProvider router={ router } />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Offers", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Offers", { selector: "button" }));

    await waitFor(() => {
      expect(screen.getAllByText("Decline", { selector: "button" })).toHaveLength(2);
    });

    userEvent.click(screen.getAllByText("Decline", { selector: "button" })[0]);

    await waitFor(() => {
      expect(tradeAPI.deleteTrade).toHaveBeenCalledWith(testTrades[0]._id);
      expect(screen.getByText("Trade declined")).toBeInTheDocument();
    });
  });
});
