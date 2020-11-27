import {useRouteMatch, NavLink} from 'react-router-dom'

function Header(props) {
  const match = useRouteMatch()
  return (
    <header>
      <nav>
        我来组成头部 {JSON.stringify(match)} &nbsp;&nbsp;
        <NavLink to="/">/</NavLink>&nbsp;&nbsp;
        <NavLink to="/home">/home</NavLink>&nbsp;&nbsp;
        <NavLink to="/about">/about</NavLink>&nbsp;&nbsp;
        <NavLink to="/help">/help</NavLink>&nbsp;&nbsp;
        <NavLink to="/support">/support</NavLink>
      </nav>
    </header>
  )
}

export default Header
