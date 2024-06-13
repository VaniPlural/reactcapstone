import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export function NavbarNew(){
    return(
        <>
          <Navbar
            expand="lg"
            className="fixed-top page-header bg-info shadow fw-bold"
          >
            <Container className="container-fluid">
              <Navbar.Brand href="/">
                <Image
                  alt="logo"
                  src="./logo.png"
                  width="42"
                  height="40"
                  className="d-inline-block align-top rounded"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Link
                  className=" d-flex me-2 shadow btn btn-danger border border-secondary"
                  to="/"
                >
                  <button>Home</button>
                </Link>
                <div className="vr"></div>
                <Link to="/displayToDo">
                  <button>display ToDo</button>
                  </Link>
            <Link
              className="d-flex ms-2 shadow btn btn-success border border-secondary"
              to="/userRegistration"
            >
              <button>user Registration</button>
            </Link>
            <Link to="/addToDo">
              <button>Add To Do</button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
    
}
