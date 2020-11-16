import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// import {AsyncComponent} from './util/AsyncComponent'
import {forComponent} from './util/async-component'
import home from './view/home'
// import about from './view/about'
import help from './view/help'
import notFound from './view/not-found'

// const about = <AC promised={import('./view/about')} />
// const about = import('./view/about')
// const abc = <AC promised={import('./view/about')} />

const about = forComponent(() => import('./view/about'))

function App(props) {
  return (
    <BrowserRouter>
      {/* <pre>{props.children}</pre> */}
      <Switch>
        <Route exact path='/' component={home} />
        <Redirect exact from='/home' to='/' />
        {/* component -> ok */}
        <Route exact path='/about' component={about} />
        <Route exact path='/help' component={help} />
        <Route component={notFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
