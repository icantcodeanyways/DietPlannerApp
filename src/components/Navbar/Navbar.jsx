import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'



function NavbarSample() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><h3>Diet Planner Application</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav className='ms-auto' >
          <Nav.Link href="/"  style={{ color: "white" }}>Home</Nav.Link>
            <Nav.Link href="#pricing"  style={{ color: "white" }}>About</Nav.Link>
            <Nav.Link href="#pricing"  style={{ color: "white" }}>Contact</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarSample