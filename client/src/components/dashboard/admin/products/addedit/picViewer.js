import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Loader from 'utils/loader';

const PicViewer = ({ formik, deletePic }) => {
    const [idToDelete, setIdToDelete] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (item, index) => {
        setIdToDelete({id: item.id, index: index});
        setShow(true);
    };

    const confirmDelete = () => {
        setLoading(true);
        deletePic(idToDelete)
        handleClose();
        setIdToDelete(null);
        setLoading(false);
    }

    return (
        <>
            { loading ? 
                <Loader />
                :
                <>
                    { formik.values && formik.values.images ?
                        formik.values.images.map((item, i) => (
                            <div key={i}
                                className="pic_block"
                                onClick={() => handleShow(item, i)}
                                style={{
                                    background: `url(${item.url})`
                                }}
                            ></div>
                        ))
                        : null
                    }
                </>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this image?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PicViewer;