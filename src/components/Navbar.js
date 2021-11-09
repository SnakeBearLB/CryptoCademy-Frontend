import Navlinks from './Navlinks'
import {Hamburger} from '../styles/Navbar.styled'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'
import {useState} from 'react'

const Navbar = () => {

  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const openIcon = <HiOutlineMenuAlt4 onClick={() => setOpen(!open)}/>

  const closeIcon = <GrClose onClick={() => setOpen(!open)}/>

  return (

      <nav>
        <Hamburger>
          {open ? closeIcon : openIcon}
        </Hamburger>
        <div>
          {open && <Navlinks closeMenu={closeMenu}/>}
        </div>
      </nav>

  )
}

export default Navbar