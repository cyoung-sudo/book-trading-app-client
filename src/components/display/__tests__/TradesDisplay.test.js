import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import TradesDisplay from "../TradesDisplay";
// Data
import { testTrades } from "../../../data/tradeTestData";

describe("----- <TradesDisplay/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly displays all users", async () => {
    render(
      <BrowserRouter>
        <TradesDisplay
          trades={ testTrades }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("tradesDisplay-trade")).toHaveLength(2);
      expect(screen.getByText(testTrades[0].initiatorUsername)).toBeInTheDocument();
      expect(screen.getByText(testTrades[0].recipientUsername)).toBeInTheDocument();
      expect(screen.getByText(testTrades[1].initiatorUsername)).toBeInTheDocument();
      expect(screen.getByText(testTrades[1].recipientUsername)).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly handles accepting a trade", async () => {
    // Mock props
    const mockHandleAccept = jest.fn();

    render(
      <BrowserRouter>
        <TradesDisplay
          trades={ testTrades }
          ownership={ true }
          mode="profile"
          handleAccept={ mockHandleAccept }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Accept", { selector: "button" })).toHaveLength(2);
    });

    userEvent.click(screen.getAllByText("Accept", { selector: "button" })[0]);

    await waitFor(() => {
      expect(mockHandleAccept).toHaveBeenCalledWith(testTrades[0]);
    });
  });

  //----- Test 3 -----
  it("correctly handles declining a trade", async () => {
    // Mock props
    const mockHandleDecline = jest.fn();

    render(
      <BrowserRouter>
        <TradesDisplay
          trades={ testTrades }
          ownership={ true }
          mode="profile"
          handleDecline={ mockHandleDecline }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Decline", { selector: "button" })).toHaveLength(2);
    });

    userEvent.click(screen.getAllByText("Decline", { selector: "button" })[0]);

    await waitFor(() => {
      expect(mockHandleDecline).toHaveBeenCalledWith(testTrades[0]._id);
    });
  });
});
