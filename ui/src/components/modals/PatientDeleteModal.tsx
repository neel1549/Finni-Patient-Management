import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Patient, deletePatient } from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

interface PatientTableProps {
  isDeleting: boolean;
  setIsDeleting: (value) => void;
  deletingPatient: Patient | null;
}

const PatientDeleteModal = (props: PatientTableProps) => {
  const { isDeleting, setIsDeleting, deletingPatient } = props;
  const { token } = useAuth();
  async function handleDelete() {
    console.log("hi");
    await deletePatient(deletingPatient.patientId, token);
  }
  return (
    <Modal
      show={isDeleting}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this patient?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setIsDeleting(false);
            handleDelete();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PatientDeleteModal;
