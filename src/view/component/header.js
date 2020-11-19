import {useRouteMatch} from 'react-router-dom'

function Header(props) {
  const match = useRouteMatch()
  console.log('header.js', {match})
  return (
    <header>
      <nav>我来组成头部</nav>
    </header>
  )
}

export default Header
