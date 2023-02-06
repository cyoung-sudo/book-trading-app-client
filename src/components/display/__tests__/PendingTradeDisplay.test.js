import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import PendingTradeDisplay from "../PendingTradeDisplay";
// Data
import { testPendingTrades } from "../../../data/pendingTradeTestData";

describe("----- <PendingTradeDisplay/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly displays all pending-trades", async () => {
    render(
      <BrowserRouter>
        <PendingTradeDisplay
          books={ testPendingTrades }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("pendingTradeDisplay-book")).toHaveLength(3);
      expect(screen.getByText(testPendingTrades[0].bookTitle)).toBeInTheDocument();
      expect(screen.getByText(testPendingTrades[1].bookTitle)).toBeInTheDocument();
      expect(screen.getByText(testPendingTrades[2].bookTitle)).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly removes a pending-trade", async () => {
    // Mock props
    const mockRemoveBook = jest.fn();

    render(
      <BrowserRouter>
        <PendingTradeDisplay
          books={ testPendingTrades }
          active={ true }
          removeBook={ mockRemoveBook }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("pendingTradeDisplay-remove")).toHaveLength(3);
    });

    userEvent.click(screen.getAllByTestId("pendingTradeDisplay-remove")[0]);

    await waitFor(() => {
      expect(mockRemoveBook).toHaveBeenCalledWith(testPendingTrades[0].bookId);
    });
  });

  //----- Test 3 -----
  it("correctly submits pending-trades", async () => {
    // Mock props
    const mockHandleSubmit = jest.fn();

    render(
      <BrowserRouter>
        <PendingTradeDisplay
          books={ testPendingTrades }
          mode="request"
          active={ true }
          handleSubmit={ mockHandleSubmit }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Offer", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Offer", { selector: "button" }));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
