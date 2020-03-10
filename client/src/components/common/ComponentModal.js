import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const ComponentModal = props => {
  const { buttonLabel, component } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" className="btn-sm" block onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
        <ModalBody>{component}</ModalBody>
      </Modal>
    </div>
  );
};

export default ComponentModal;
