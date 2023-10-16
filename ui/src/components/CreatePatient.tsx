import React, { useRef, useState } from "react";
import { Container, Row, Form, Button, Card } from "react-bootstrap";
import { Patient, createNewPatient } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { KeyObject } from "crypto";
const originalFields = [
  "firstName",
  "middleName",
  "lastName",
  "status",
  "email",
  "address",
  "phoneNumber",
];
const fieldstoTypeMap = {
  firstName: "text",
  middleName: "text",
  lastName: "text",
  status: "text",
  email: "email",
  address: "text",
  phoneNumber: "tel",
};
const CreatePatient = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState<Patient[] | null>(null);
  const changeRef = useRef<HTMLInputElement>();

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const [inputFields, setInputFields] = useState(originalFields);

  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    let patient = {};
    console.log(data);
    for (const [key, value] of Object.entries(data || [])) {
      if (originalFields.includes(key)) {
        patient[key] = value;
      } else {
        console.log("hsll");
        if (!patient["additionalFields"]) {
          patient["additionalFields"] = {};
        }
        patient["additionalFields"][key] = value;
      }
    }
    console.log(patient);
    await createNewPatient(
      { ...patient, ...{ providerId: currentUser.uid } } as Patient,
      token
    );
    navigate("/home");
  }
  const updateData = (e) => {
    e.preventDefault();
    if (!inputFields.includes(e.target.name)) {
      setInputFields([...inputFields, ...[e.target.name]]);
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    setInputFields([...inputFields, ...[changeRef.current.value]]);
    setIsAdding(false);
  };

  return (
    <>
      <Card
        style={{
          borderRadius: 28,
          boxShadow: "0px 0px 10px 10px black",
          opacity: 0.8,
          height: "80%",
          width: "60%",
          marginLeft: "20%",
          marginTop: "100px",
          overflow: "scroll",
        }}
      >
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              {inputFields.map((key) => {
                return (
                  <>
                    <Form.Group style={{ width: 300 }} className="mb-3">
                      <Form.Label>{key} </Form.Label>
                      <Form.Control
                        onChange={updateData}
                        type={fieldstoTypeMap[key]}
                        name={key}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </>
                );
              })}
            </Row>
            {!isAdding && (
              <Button
                onClick={() => {
                  setIsAdding(true);
                }}
                style={{ width: 200 }}
                size="sm"
              >
                Add more fields
              </Button>
            )}

            <br />

            {isAdding && (
              <>
                <Form.Label>Field Name </Form.Label>
                <Form.Control ref={changeRef} required></Form.Control>
                <Button
                  size="sm"
                  style={{ marginTop: 15, width: 200 }}
                  onClick={handleAdd}
                >
                  Add Field
                </Button>
              </>
            )}

            <Button
              disabled={isAdding}
              className="w-100"
              type="submit"
              style={{ marginTop: 15, marginBottom: 15 }}
            >
              Create
            </Button>
          </Form>
        </Container>
      </Card>
    </>
  );
};

export default CreatePatient;
