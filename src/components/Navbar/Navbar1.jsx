import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";

function NavbarSample1() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <h2 style={{ color: "white" }}>User Name</h2>

          <Nav className="mx-auto">
            {/* <Nav.Link href="/"  style={{ color: "white" }}>Home</Nav.Link> */}
            <Nav.Link href="#" style={{ color: "white" }}>
              Personal Info
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarSample1;
