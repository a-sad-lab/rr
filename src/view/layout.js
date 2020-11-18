import Header from './component/header'
import Footer from './component/footer'
import Aside from './component/aside'
// import Main from './component/main'

function Layout(props) {
  console.log('layout props', props)
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
