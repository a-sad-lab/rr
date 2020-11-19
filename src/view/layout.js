import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import Header from './component/header'
import Footer from './component/footer'
import Aside from './component/aside'
// import Main from './component/main'

function Layout(props) {
  const {listen, block} = useHistory()
  console.log('layout')
  useEffect(function() {

    const unblock = block(function(location, action) {
      console.log('history block', {location, action})
      if(location.pathname !== '/home') {
        unblock()
      }else {
        return false
      }
    })

    const unListen = listen(function(location, action) {
      console.log('history listen', {location, action})
    })

    return function() {
      unListen()
    }

  })

  return (
    <>
      <Header {...props} />
      <Aside />
      {props.children}
      <Footer />
    </>
  )
}

export default Layout
