import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const CustomModal = ({
  isOpen,
  blog,
  handleClose,
  handleConfirm,
  className,
  type,
}) => {
  return (
    blog && (
      <Modal isOpen={isOpen} onClick={handleClose} className={className}>
        <ModalHeader
          toggle={handleClose}
        >{`Do you want delete ${blog.title}'s Blog`}</ModalHeader>
        {
          (type = "delete" ? (
            ""
          ) : (
            <ModalBody>
              <p>bla bla</p>
            </ModalBody>
          ))
        }
        <ModalFooter>
          <Button
            color={(type = "delete" ? "danger" : "primary")}
            onClick={() => handleConfirm(blog._id)}
          >
            {(type = "delete" ? "Delete" : "Save")}
          </Button>
          <Button color="warning" onClick={handleClose}>
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    )
  );
};

export default CustomModal;
