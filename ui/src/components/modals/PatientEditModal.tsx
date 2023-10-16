import React, { useRef } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { Patient, updatePatient } from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

interface PatientEditModalProps {
  isEditing: boolean;
  setIsEditing: (value) => void;
  editingPatient: Patient | null;
}
const PatientEditModal = (props: PatientEditModalProps) => {
  const { isEditing, setIsEditing, editingPatient } = props;
  const firstNameRef = useRef<HTMLInputElement>();
  const middleNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const statusRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const { token } = useAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPatient = {
      firstName: firstNameRef.current.value,
      middleName: middleNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      status: statusRef.current.value,
      phoneNumber: phoneRef.current.value,
      providerId: editingPatient.providerId,
      patientId: editingPatient.patientId,
    };
    await updatePatient(updatedPatient, token);
    setIsEditing(false);
  };
  return (
    <Modal
      show={isEditing}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <Button onClick={() => setIsEditing(false)}>Close</Button>
      </Modal.Header>
      <Modal.Body>
        <h4>Patient</h4>
        <p>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="first-name"
              >
                <Form.Label>First Name </Form.Label>
                <Form.Control
                  defaultValue={editingPatient?.firstName}
                  ref={firstNameRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="last-name"
              >
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  defaultValue={editingPatient?.middleName}
                  ref={middleNameRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="last-name"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  defaultValue={editingPatient?.lastName}
                  ref={lastNameRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="last-name"
              >
                <Form.Label>Status</Form.Label>
                <Form.Control
                  defaultValue={editingPatient?.status}
                  ref={statusRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="last-name"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  defaultValue={editingPatient?.email}
                  required
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="last-name"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  defaultValue={editingPatient?.address}
                  ref={addressRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{ width: 300 }}
                className="mb-3"
                id="last-name"
              >
                <Form.Label>Phone #</Form.Label>
                <Form.Control
                  defaultValue={editingPatient?.phoneNumber}
                  ref={phoneRef}
                  required
                ></Form.Control>
              </Form.Group>
            </Row>
            <Button className="w-100" type="submit" style={{ marginTop: 15 }}>
              Submit
            </Button>
          </Form>
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default PatientEditModal;
