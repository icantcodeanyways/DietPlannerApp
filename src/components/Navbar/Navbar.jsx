import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./Navbar.css";

function NavbarSample() {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
  const history = useHistory();

  function handleLogOut(e) {
    e.preventDefault();
    setIsAuthenticated(false);
    localStorage.removeItem("Token");
    toast.success("You have been logged out successfully..");
    history.push("/");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
      {isAuthenticated ? (
        <Container>
          <Navbar.Brand>
            <h3>Diet Planner Application</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/dashboard">
                <Nav.Link style={{ color: "white" }}>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link style={{ color: "white" }}>Update user info</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/diet">
                <Nav.Link style={{ color: "white" }}>
                  Generate diet plan
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/view_diet_plan">
                <Nav.Link style={{ color: "white" }}>
                  View generated diet plans
                </Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={handleLogOut} style={{ color: "white" }}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (
        <Container>
          <Navbar.Brand>
            <h3>Diet Planner Application</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link style={{ color: "white" }}>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link style={{ color: "white" }}>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link style={{ color: "white" }}>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
}

export default NavbarSample;
