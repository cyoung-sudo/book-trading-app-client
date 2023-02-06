import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import BooksDisplay from "../BooksDisplay";
// Data
import { testBooks } from "../../../data/bookTestData";

describe("----- <BooksDisplay/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly displays all books", async () => {
    render(
      <BrowserRouter>
        <BooksDisplay
          books={ testBooks }
          mode="display"/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("booksDisplay-book")).toHaveLength(3);
      expect(screen.getByText(testBooks[0].title)).toBeInTheDocument();
      expect(screen.getByText(testBooks[1].title)).toBeInTheDocument();
      expect(screen.getByText(testBooks[2].title)).toBeInTheDocument();
      expect(screen.getAllByText("View Owner Profile", { selector: "a" })).toHaveLength(3);
    });
  });

  //----- Test 2 -----
  it("correctly handles deleting a book", async () => {
    // Mock props
    const mockHandleDelete = jest.fn();

    render(
      <BrowserRouter>
        <BooksDisplay
          books={ testBooks }
          ownership={ true }
          mode="profile"
          handleDelete={ mockHandleDelete }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Delete", { selector: "button" })).toHaveLength(3);
    });

    userEvent.click(screen.getAllByText("Delete", { selector: "button" })[0]);

    await waitFor(() => {
      expect(mockHandleDelete).toHaveBeenCalledWith(testBooks[0]._id);
    });
  });

  //----- Test 3 -----
  it("correctly handles requesting a book", async () => {
    // Mock props
    const mockAddBook = jest.fn();

    render(
      <BrowserRouter>
        <BooksDisplay
          books={ testBooks }
          mode="request"
          addBook={ mockAddBook }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Request", { selector: "button" })).toHaveLength(3);
    });

    userEvent.click(screen.getAllByText("Request", { selector: "button" })[0]);

    await waitFor(() => {
      expect(mockAddBook).toHaveBeenCalledWith(testBooks[0]._id, testBooks[0].title);
    });
  });

  //----- Test 4 -----
  it("correctly handles offering a book", async () => {
    // Mock props
    const mockAddBook = jest.fn();

    render(
      <BrowserRouter>
        <BooksDisplay
          books={ testBooks }
          mode="offer"
          addBook={ mockAddBook }/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Offer", { selector: "button" })).toHaveLength(3);
    });

    userEvent.click(screen.getAllByText("Offer", { selector: "button" })[0]);

    await waitFor(() => {
      expect(mockAddBook).toHaveBeenCalledWith(testBooks[0]._id, testBooks[0].title);
    });
  });
});
