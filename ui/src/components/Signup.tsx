import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../api/api";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [isSigningUp, setIsSigningUp] = useState(true);
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const { signup, login, currentUser, token } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (isSigningUp) {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          setLoading(false);
          return setError("Passwords do not match");
        }
        await signup(emailRef.current.value, passwordRef.current.value);
        console.log(currentUser);
      } else {
        await login(emailRef.current.value, passwordRef.current.value);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return;
    }

    navigate("/home");
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          width: "800vh",
        }}
      >
        <Card
          style={{
            borderRadius: 28,
            opacity: 0.8,
            height: "100%",
            width: 620,
            boxShadow: "0px 0px 10px 10px black",
          }}
        >
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  required
                ></Form.Control>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type="password"
                  required
                ></Form.Control>
              </Form.Group>
              {isSigningUp && (
                <Form.Group className="mb-3" id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    ref={passwordConfirmRef}
                    type="password"
                    required
                  ></Form.Control>
                </Form.Group>
              )}
              <Button
                className="w-100"
                type="submit"
                style={{ marginTop: 15 }}
                disabled={loading}
              >
                {isSigningUp ? "Sign Up" : "Log In"}
              </Button>
            </Form>
          </Card.Body>
          {isSigningUp ? (
            <div className="text-center">
              Already have an account?{" "}
              <Button onClick={() => setIsSigningUp(false)}>Log In</Button>
            </div>
          ) : (
            <div className="text-center">
              Don't have an account?{" "}
              <Button onClick={() => setIsSigningUp(!isSigningUp)}>
                Sign Up Here
              </Button>
            </div>
          )}
        </Card>
      </Container>
    </>
  );
}
