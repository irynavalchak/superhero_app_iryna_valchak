import React from "react";
import "./Pagination.scss";

interface Props {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, setPage }) => ( 
  <div className="pagination">
    <button className="pagination__button" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
    <span className="pagination__text"> {page} / {totalPages} </span>
    <button className="pagination__button" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
  </div>
);

export default Pagination;
