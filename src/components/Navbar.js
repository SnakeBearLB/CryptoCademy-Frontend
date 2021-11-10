import Navlinks from './Navlinks'
import {Hamburger, Div} from '../styles/Navbar.styled'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'
import {useState} from 'react'

const Navbar = ({user}) => {

  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const openIcon = <HiOutlineMenuAlt4 onClick={() => setOpen(!open)}/>

  const closeIcon = <GrClose onClick={() => setOpen(!open)}/>

  return (

      <nav>
        <Div>
        <Hamburger>
          {open ? closeIcon : openIcon}
        </Hamburger>
        </Div>
        <div>
          {open && <Navlinks closeMenu={closeMenu} user={user}/>}
        </div>
      </nav>

  )
}

export default Navbar