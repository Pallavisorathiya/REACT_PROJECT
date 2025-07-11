import { Container, Navbar, Button } from 'react-bootstrap';
import { IoPersonAdd } from "react-icons/io5";
import Logo from '../assets/logo-dark.svg'; 


const Header = ({ onAdd }) => {
  return (
    <Navbar bg="light" className="px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={Logo} alt="logo"className='w-75' />
        </Navbar.Brand>
        <Button variant="primary" className='header-btn' onClick={onAdd}>
          <IoPersonAdd className="me-1 mb-1" />
          Add Patient Details
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;