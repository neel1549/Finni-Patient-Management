import React, { useState } from "react";
import PatientTable from "./PatientTable";
import { Button, Container, Row, Col } from "react-bootstrap";
import { createNewPatient, Patient } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import PatientEditModal from "./modals/PatientEditModal";
import PatientDeleteModal from "./modals/PatientDeleteModal";
import Sidebar from "./SideBar";

const Dashboard = () => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  console.log(deletingPatient);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <Container>
        <Row>
          <PatientTable
            isEditing={isEditing}
            isDeleting={isDeleting}
            setIsEditing={setIsEditing}
            setIsDeleting={setIsDeleting}
            setDeletingPatient={setDeletingPatient}
            setEditingPatient={setEditingPatient}
          />
          <PatientEditModal
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editingPatient={editingPatient}
          />
          <PatientDeleteModal
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            deletingPatient={deletingPatient}
          />
        </Row>
      </Container>
    </>
  );
};
export default Dashboard;
