import {useRouteMatch, NavLink} from 'react-router-dom'

function Header(props) {
  const match = useRouteMatch()
  console.log('header.js', {match})
  return (
    <header>
      <nav>
        我来组成头部&nbsp;
        <NavLink to="/">/</NavLink>&nbsp;
        <NavLink to="/home">/home</NavLink>&nbsp;
        <NavLink to="/about">/about</NavLink>&nbsp;
        <NavLink to="/help">/help</NavLink>
      </nav>
    </header>
  )
}

export default Header
