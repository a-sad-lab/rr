import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import {AsyncComponent} from './util/AsyncComponent'
import home from './view/home'
// import about from './view/about'
import notFound from './view/not-found'

const about = () => <AsyncComponent promised={import('./view/about')} />

function App(props) {
  return (
    <BrowserRouter>
      {/* <pre>{props.children}</pre> */}
      <Switch>
        <Route exact path='/' component={home} />
        <Route exact path='/home'>
          <Redirect to='/' />
        </Route>
        <Route exact path='/about' component={about} />
        <Route component={notFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
