import React from 'react';
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Moment from 'react-moment';
import Loader from 'utils/loader'

const ProductsTable = ({
        prods, 
        prevPage, nextPage, editProd,
        openModal, showModal, closeModal,
        removeProd
    }) => {
    const goToPrevPage = (page) => {
        prevPage(page)
    }

    const goToNextPage = (page) => {
        nextPage(page)
    }

    return (
        <>
            { prods && prods.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Created</td>
                                <td>Model</td>
                                <td>Available</td>
                            </tr>
                        </thead>
                        <tbody>
                            { prods.docs.map((item) => (
                                <tr key={item._id}>
                                    <td><Moment to={item.date}></Moment></td>
                                    <td>{item.model}</td>
                                    <td>{item.available}</td>
                                    <td className='action_btn remove_btn'
                                        onClick={() => openModal(item._id)}
                                    >
                                        Remove
                                    </td>
                                    <td className='action_btn edit_btn'
                                        onClick={() => editProd(item._id)}
                                    >
                                        Edit
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        { prods.hasPrevPage ?
                            <>
                                <Pagination.Prev onClick={() => goToPrevPage(prods.prevPage)} />
                                <Pagination.Item onClick={() => goToPrevPage(prods.prevPage)}>
                                    {prods.prevPage}
                                </Pagination.Item>
                            </>
                            : null
                        }
                        <Pagination.Item active>{prods.page}</Pagination.Item>
                        { prods.hasNextPage ?
                            <>
                                <Pagination.Item onClick={() => goToNextPage(prods.nextPage)}>
                                    {prods.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={() => goToNextPage(prods.nextPage)} />
                            </>
                            : null
                        }
                    </Pagination>
                    <hr />
                    <LinkContainer to='/dashboard/admin/add_product'>
                        <Button variant="secondary">Add product</Button>
                    </LinkContainer>
                </>
                :
                <Loader />
            }
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete item.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => closeModal()}>
                        Oops, close this now.
                    </Button>
                    <Button varian='danger' onClick={() => removeProd()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductsTable;