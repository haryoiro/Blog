import React, { FC } from 'react'
import { Link } from 'gatsby'

export type PaginationProps = {
  numPages: number
  currentPage: number
}

export const Pagination: FC<PaginationProps> = ({ numPages, currentPage }) => {
  const isFirst = currentPage === 1
  const isLast = numPages === currentPage

  return (
    <div className="pagination-container">
      {!isFirst && (
        <Link className="pagination-button" to={`/blog/`} rel="prev">
          &lt;
        </Link>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <>
          <Link
            key={`pagination-number${i + 1}`}
            to={`/blog/${i === 0 ? '' : i + 1}`}
            className="pagination-button"
          >
            {i + 1}
          </Link>
        </>
      ))}
      {!isLast && (
        <Link className="pagination-button" to={`/blog/${numPages}`} rel="next">
          &gt;
        </Link>
      )}
    </div>
  )
}

export default Pagination
