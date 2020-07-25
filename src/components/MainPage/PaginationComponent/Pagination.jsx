import React from 'react';
import { useHistory } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import './pagination.scss'


export const PaginationMainPage = ({ page, setPage, maxPage, fetchList }) => {

  const handleChange = (event, value) => {
    setPage(value);
    fetchList()
    console.log({ event })
    console.log({ value });
    console.log({ page });
  };

  const history = useHistory()

  return (
    <div className="pagination-mainpage">
      <Pagination count={maxPage} color="secondary" page={page} onChange={handleChange} />
    </div>
  );
}