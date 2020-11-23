import Header from './component/header'
import Footer from './component/footer'
import Aside from './component/aside'
import useNg from '../hook/useNavigationGuard'

function Layout(props) {
  console.log('layout')
  useNg({
    blockCb(f, t, a) {
      console.log('blockCb', f, t, a)
      return t.pathname === '/home'
    },
    listenCb(f, t, a) {
      console.log('listenCb', f, t, a)
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
