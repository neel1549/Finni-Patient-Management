import React, { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { Patient, deletePatient } from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import PatientDeleteModal from "./PatientDeleteModal";
import { useNavigate } from "react-router-dom";

interface FilterModalProps {
  data: Patient[];
  setData: (value) => void;
  show: boolean;
  setShow: (value) => void;
}

const FilterModal = (props: FilterModalProps) => {
  let { data, setData, show, setShow } = props;
  const [filter, setFilter] = useState({});
  const navigate = useNavigate();
  const updateData = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();

    Object.entries(filter).map(([key, value]) => {
      data = data.filter((data: Patient) => data[key] === value);
    });
    setData(data);
    setShow(false);
    navigate("/home");
  }
  console.log(data);
  return (
    <Modal show={show} size="lg">
      <Modal.Header>
        <Modal.Title>Filter Patients </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            {Object.entries(data[0] || {}).map(([key, value]) => {
              return (
                <Form.Group style={{ width: 300 }} className="mb-3">
                  <Form.Label>{key} </Form.Label>
                  <Form.Control
                    type="search"
                    onChange={updateData}
                    name={key}
                  ></Form.Control>
                </Form.Group>
              );
            })}
          </Row>
          <Button className="w-100" type="submit" style={{ marginTop: 15 }}>
            Filter
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default FilterModal;
