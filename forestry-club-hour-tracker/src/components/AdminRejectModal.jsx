import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import PropTypes from 'prop-types';

function AdminRejectModal(onReject) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleSubmit = (e) => {
        console.log(e.target)
        // grab data from message box
        // send rejection message
        onReject(true)
        handleClose();
    }


    return (

        <>
            <Modal
                show={show}
                onHide={handleClose}
                onShow={handleOpen}
                keyboard={false}
                backdrop='static'
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <p>Todo: add text box here</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} variant="danger">Reject Submission</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

AdminRejectModal.propTypes = {
    onReject: PropTypes.func
}

export default AdminRejectModal;