import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import CreatePatient from "./components/CreatePatient";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(7,102,121,1) 0%, rgba(81,81,242,1) 100%)",
          height: "100vh",
          overflow: "scroll",
        }}
      >
        <AuthProvider>
          <NavBar />
          <Container>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/new-patient" element={<CreatePatient />} />
              </Route>
              <Route path="/" element={<Signup />} />
            </Routes>
          </Container>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
