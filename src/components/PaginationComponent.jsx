import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = (props) => {


  const { pageNumber, totalPages, lastPage } = props.post;

  const handleChange = (index) => {
    props.pageChange(index);
  }


  return (
    <div>
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={pageNumber < 1}>
          <PaginationLink onClick={() => handleChange(0)}
            first
            href="#"
          />
        </PaginationItem>
        <PaginationItem disabled={pageNumber < 1}>
          <PaginationLink onClick={() => handleChange(pageNumber - 1)}
            href="#"
            previous
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index} onClick={() => handleChange(index)} active={pageNumber === index}>
            <PaginationLink href="#">
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={lastPage}>
          <PaginationLink onClick={() => { handleChange(pageNumber + 1) }}
            href="#"
            next
          />
        </PaginationItem>
        <PaginationItem disabled={lastPage}>
          <PaginationLink onClick={() => { handleChange(totalPages-1) }}
            href="#"
            last
          />
        </PaginationItem>
      </Pagination>
    </div>
  )
}

export default PaginationComponent
