import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import Pagination from "../Pagination";
// Data
import { testUsers } from "../../../data/userTestData";

describe("----- <Pagination/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly switches to next page", async () => {
    // Mock props
    const mockSetPageContent = jest.fn();
    const mockSetPage = jest.fn();

    render(
      <Pagination
        items={ testUsers }
        itemsPerPage={ 2 }
        page={ 1 }
        setPageContent={ mockSetPageContent }
        setPage={ mockSetPage }/>
    );

    await waitFor(() => {
      expect(mockSetPageContent).toHaveBeenCalledWith([testUsers[0], testUsers[1]]);
      expect(screen.getByText("Next", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Next", { selector: "button" }));

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalled();
    });
  });

  //----- Test 2 -----
  it("correctly switches to previous page", async () => {
    // Mock props
    const mockSetPageContent = jest.fn();
    const mockSetPage = jest.fn();

    render(
      <Pagination
        items={ testUsers }
        itemsPerPage={ 2 }
        page={ 2 }
        setPageContent={ mockSetPageContent }
        setPage={ mockSetPage }/>
    );

    await waitFor(() => {
      expect(mockSetPageContent).toHaveBeenCalledWith([testUsers[2]]);
      expect(screen.getByText("Prev", { selector: "button" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Prev", { selector: "button" }));

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalled();
    });
  });
});
