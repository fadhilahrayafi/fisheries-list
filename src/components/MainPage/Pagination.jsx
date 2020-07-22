import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


export const PaginationMainPage = () => {
  return (
    <div className="pagination-mainpage">
      <Pagination count={10} color="secondary" onClick={(e)=> console.log(e)}/>
    </div>
  );
}