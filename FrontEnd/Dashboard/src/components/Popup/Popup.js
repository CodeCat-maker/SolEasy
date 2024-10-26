import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const Popup = ({ isOpen, toggle, title, content, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-black">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {content}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>{cancelText}</Button>
        <Button color="primary" onClick={onConfirm}>{confirmText}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default Popup;
