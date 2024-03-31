import React, { useState } from "react";
import Post from "./Post";
import ReactPaginate from 'react-paginate';
import "./css/Pagination.css";

function Pagination({postsProp}) {
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 5;
  const pageVisited = pageNumber * postPerPage;

  const displayPosts = postsProp
    .slice(pageVisited, pageVisited + postPerPage)
    .map((post, index) => {
      return (
        <Post key={index} post={post} />
      );
    });

  const pageCount = Math.ceil(postsProp.length / postPerPage);

  const handlePageClick = ({selected} ) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {displayPosts}
      <ReactPaginate
        breakLabel={'...'}
        nextLabel={'next >'}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel={'< previous'}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  )
}

export default Pagination