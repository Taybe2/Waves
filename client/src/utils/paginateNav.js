import React from 'react';
import { Button, Pagination } from 'react-bootstrap';

const PaginationNav = ({
    prods, goToPage, resetSearch
}) => {

    const page = (page) => {
        goToPage(page);
    }

    return (
        <>
            { prods.docs.length > 0 ?
                <Pagination>
                    { prods.hasPrevPage ? 
                        <>
                            <Pagination.Prev onClick={() => page(prods.prevPage)} />
                            <Pagination.Item onClick={() => page(prods.prevPage)}>
                                {prods.prevPage}
                            </Pagination.Item>
                        </>
                        : 
                        null
                    }
                    <Pagination.Item active>{prods.page}</Pagination.Item>
                    { prods.hasNextPage ? 
                        <>
                            <Pagination.Item onClick={() => page(prods.nextPage)}>
                                {prods.nextPage}
                            </Pagination.Item>
                            <Pagination.Next onClick={() => page(prods.nextPage)} />
                        </>
                        :
                        null
                    }
                </Pagination>
                :
                <div>
                    <div>Sorry, nothing was found</div>
                    <Button
                        className='mt-3'
                        variant='primary'
                        onClick={resetSearch}
                    >
                        Reset Search
                    </Button>
                </div>
            }
        </>
    )
};

export default PaginationNav;