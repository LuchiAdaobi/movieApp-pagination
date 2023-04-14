// import React from "react";

// function Pagination({ totalPages, currentPage, onPageChange }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <ul className="pagination">
//       {pageNumbers.map((number) => (
//         <li key={number} className="page-item">
//           <a
//             href="#!"
//             onClick={() => onPageChange(number)}
//             className={`page-link ${currentPage === number ? "active" : ""}`}
//           >
//             {number}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default Pagination;

import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const displayPages = 5;
  const totalPagesArray = Array.from(Array(totalPages).keys()).map(
    (i) => i + 1
  );

  const startPage = Math.max(currentPage - Math.floor(displayPages / 2), 1);
  const endPage = Math.min(startPage + displayPages - 1, totalPages);

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPages = () => {
    return totalPagesArray
      .filter((page) => page >= startPage && page <= endPage)
      .map((page) => {
        return (
          <li key={page}>
            <button
              className={page === currentPage ? "active" : ""}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          </li>
        );
      });
  };

  return (
    <ul className="pagination">
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
        >
          Previous
        </button>
      </li>
      {renderPages()}
      <li>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  );
}

export default Pagination;

