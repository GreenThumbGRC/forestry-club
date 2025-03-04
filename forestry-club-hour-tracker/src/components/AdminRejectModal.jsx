import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";


import PropTypes from 'prop-types';

function AdminRejectModal(onReject, name) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleSubmit = (e) => {
        console.log(e.target)
        // grab data from message box 'target.value'
        // send rejection message
        onReject(true)
        handleClose();
    }

    const handleTest = (e) => {
        console.log(e.target)
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
                <Modal.Header closeButton>
                    <div>Rejecting {name}.</div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Rejection Reason</Form.Label>
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} variant="danger">Reject Submission</Button>
                    <Button onClick={handleTest} variant="danger">test</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

AdminRejectModal.propTypes = {
    onReject: PropTypes.func,
    name: PropTypes.string
}

export default AdminRejectModal;