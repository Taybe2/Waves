import React from "react";

import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AddToCartHandler = ({ modal, errorType, handleClose }) => {
    return (
        <>
        <Modal show={modal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sorry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { errorType ==='auth' ? 
                        <div>You need to register or sign in first.</div>
                    :
                        <div>You need to verify your account.</div>
                }
            </Modal.Body>
            <Modal.Footer>
                { errorType === 'auth' ? 
                        <LinkContainer to="/signin">
                            <Button variant="primary">
                                Go to login page
                            </Button>
                        </LinkContainer>
                    :
                        <Button variant="primary" onClick={() => alert("Trigger")}>
                            Send email verification again
                        </Button>
                }
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddToCartHandler;