import { Link } from 'react-router-dom'
import { Nav } from "../styles/Header.styled"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <div>
      <Nav>
        <Navbar />
      </Nav>
    </div>
  )
}

export default Header;