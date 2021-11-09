import { Link } from 'react-router-dom'
import {Ul, Li, P} from '../styles/Navlinks.styled'


const Navlinks = ({closeMenu}) => {

  return (
      <Ul>
        <Link to="/dashboard" style={{textDecoration:"none"}} >
          <Li onClick={(closeMenu)}>
            <P>Dashboard</P>
          </Li>
        </Link>
        <Link to="/portfolio" style={{textDecoration:"none"}}>
          <Li onClick={(closeMenu)}>
            <P>Portfolio</P>
          </Li>
        </Link>
        <Link to="/about" style={{textDecoration:"none"}}>
          <Li onClick={(closeMenu)}>
            <P>About</P>
          </Li>
        </Link>
      </Ul>
  )
}
export default Navlinks;