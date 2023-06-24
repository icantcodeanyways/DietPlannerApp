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
    toast.success("You have been logged out successfully");
    history.push("/");
  }

  return (
    <Navbar collapseOnSelect expand="" bg="warning" variant="dark">
      {isAuthenticated ? (
        <Container>
          <Navbar.Brand>
            <h1>Diet Planner Application</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer exact to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/settings">
                <Nav.Link>Update user info</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/diet">
                <Nav.Link>Generate diet plan</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/view_diet_plan">
                <Nav.Link>View generated diet plans</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/custom_meal">
                <Nav.Link>Custom meal calculation</Nav.Link>
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
              <LinkContainer exact to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
}

export default NavbarSample;
