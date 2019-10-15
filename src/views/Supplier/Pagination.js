import React, { Component } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
  } from 'reactstrap';


export default class DefaultPagination extends Component {
    render() {
        return (
            <nav>
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag='button'>
                  Prev
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag='button'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag='button'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag='button'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag='button'>4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next tag='button'>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        )
    }
}
