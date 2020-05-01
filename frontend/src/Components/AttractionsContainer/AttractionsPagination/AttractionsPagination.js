import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const AttractionsPagination = ({currentPage, setCurrentPage, ItemsPerPage, totalItemsNr}) => {

    let pagesNr = totalItemsNr / ItemsPerPage;

    let paginationItems = [];

    for (let i = 1; i <= pagesNr; i++) {
        paginationItems.push(
            <PaginationItem
                active={i === currentPage}>
                <PaginationLink onClick={() => setCurrentPage(i)}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        )
    }

    return (
        <div>
            <Pagination aria-label="Page navigation example">
                {paginationItems}
            </Pagination>
        </div>
    );
};

export default AttractionsPagination;