import "./Pagination.css";
// React
import { useEffect } from "react";

export default function Pagination({ items, itemsPerPage, page, setPageContent, setPage }) {
  //----- Set page content
  useEffect(() => {
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageContent = items.slice(start, end);
    setPageContent(pageContent);
  }, [page, items]);

  return (
    <div className="pagination">
      {(page > 1) &&
        <button onClick={() => setPage(state => state - 1)}>Prev</button>
      }

      <div>Page: { page }</div>

      {((page * itemsPerPage) < items.length) &&
        <button onClick={() => setPage(state => state + 1)}>Next</button>
      }
    </div>
  );
};