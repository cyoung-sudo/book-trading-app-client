import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import SearchBar from "../SearchBar";
// Data
import { testUsers } from "../../../data/userTestData";

describe("----- <SearchBar/> -----", () => {
  afterEach(() => {
    cleanup();
  });

  //----- Test 1 -----
  it("correctly submits input data", async () => {
    // Mock props
    const mockSetSearchContent = jest.fn();
    const mockSetPage = jest.fn();

    render(
      <SearchBar
        items={ testUsers }
        itemProperties={["username"]}
        setSearchContent={ mockSetSearchContent }
        setPage={ mockSetPage }/>
    );

    await waitFor(() => {
      expect(screen.getByTestId("searchBar-term")).toBeInTheDocument();
      expect(screen.getByText("Search", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("searchBar-term"), "User1");
    userEvent.click(screen.getByText("Search", { selector: "input" }));

    await waitFor(() => {
      expect(mockSetSearchContent).toHaveBeenCalledWith([testUsers[0]]);
      expect(mockSetPage).toHaveBeenCalledWith(1);
    });
  });

  //----- Test 2 -----
  it("correctly searches for selected property", async () => {
    // Mock props
    const mockSetSearchContent = jest.fn();
    const mockSetPage = jest.fn();

    render(
      <SearchBar
        items={ testUsers }
        itemProperties={["username", "fullName"]}
        setSearchContent={ mockSetSearchContent }
        setPage={ mockSetPage }/>
    );

    await waitFor(() => {
      expect(screen.getByText("fullName", { selector: "button" })).toBeInTheDocument();
    });

    // Search by "fullName" property
    userEvent.click(screen.getByText("fullName", { selector: "button" }));

    await waitFor(() => {
      expect(screen.getByTestId("searchBar-term")).toBeInTheDocument();
      expect(screen.getByText("Search", { selector: "input" })).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("searchBar-term"), "FullName2");
    userEvent.click(screen.getByText("Search", { selector: "input" }));

    await waitFor(() => {
      expect(mockSetSearchContent).toHaveBeenCalledWith([testUsers[1]]);
      expect(mockSetPage).toHaveBeenCalledWith(1);
    });
  });
});
