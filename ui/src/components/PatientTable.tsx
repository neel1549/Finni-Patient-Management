import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { Button, Container, Row } from "react-bootstrap";
import { Patient, getPatients } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { createColumnHelper } from "@tanstack/react-table";
import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import FilterModal from "./modals/FilterModal";
import { backgroundColor } from "mdb-react-ui-kit/dist/types/types/colors";
interface PatientTableProps {
  isEditing: boolean;
  isDeleting: boolean;
  setIsEditing: (value) => void;
  setIsDeleting: (value) => void;
  setDeletingPatient: (value: Patient | null) => void;
  setEditingPatient: (value: Patient | null) => void;
}

const PatientTable = (props: PatientTableProps) => {
  const {
    isEditing,
    isDeleting,
    setIsEditing,
    setIsDeleting,
    setDeletingPatient,
    setEditingPatient,
  } = props;
  const [data, setData] = useState([]);
  const [filteredModal, setFilteredModal] = useState(false);
  const { currentUser, token } = useAuth();

  const fetchData = () => {
    if (currentUser) {
      getPatients(currentUser.uid, token)
        .then((res) => setData(res.data))
        .catch((e) => console.log(e));
    }
  };
  const returnColor = (status: string): string => {
    if (status === "Active") {
      return "success";
    }
    if (status === "Onboarding") {
      return "primary";
    }
    if (status === "Inquiry") {
      return "warning";
    }
    if (status == "Churned") {
      return "error";
    }
  };

  useEffect(() => {
    fetchData();
  }, [isEditing, isDeleting]);
  console.log(data);
  return (
    <>
      <Row>
        <Button
          size="sm"
          style={{ width: 250, borderRadius: 25, marginTop: 20 }}
          href="/new-patient"
        >
          Add Patient
        </Button>
        <Button
          size="sm"
          style={{ width: 250, borderRadius: 25, marginTop: 20 }}
          onClick={() => setFilteredModal(true)}
        >
          Filter Patients
        </Button>
        <Button
          size="sm"
          style={{ width: 250, borderRadius: 25, marginTop: 20 }}
          onClick={() => fetchData()}
        >
          Reset Filters
        </Button>
      </Row>
      <FilterModal
        data={data}
        setData={setData}
        show={filteredModal}
        setShow={(value) => setFilteredModal(value)}
      />

      {data && (
        <Table
          striped
          borderless
          hover
          size="lg"
          style={{
            width: "100%",
            boxShadow: "0px 0px 5px 5px lightgrey",
            marginTop: 20,
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((patient, index) => {
              return (
                <tr>
                  <td>
                    <Image
                      src={`https://i.pravatar.cc/50${index}`}
                      roundedCircle
                      style={{
                        marginTop: 10,
                        width: 30,
                      }}
                    />
                  </td>
                  <td>{patient.firstName}</td>
                  <td>{patient.middleName}</td>
                  <td>{patient.lastName}</td>
                  <td>
                    <MDBBadge
                      color={returnColor(patient.status) as backgroundColor}
                      pill
                    >
                      {patient.status}
                    </MDBBadge>
                  </td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>{patient.phoneNumber}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setIsEditing(true);
                        setEditingPatient(data[index]);
                      }}
                      color="link"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <br />
                    <Button
                      onClick={() => {
                        setIsDeleting(true);
                        setDeletingPatient(data[index]);
                      }}
                      color="link"
                      size="sm"
                      style={{ marginTop: 5 }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default PatientTable;
