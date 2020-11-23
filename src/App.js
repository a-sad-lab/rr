import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {loadAsyncComponent} from './util/async-component'
import home from './view/home'
import notFound from './view/not-found'

function loading(props) {
  console.log('loading', props)
  return <pre>loading...</pre>
}

function error(props) {
  console.log('error', props)
  return <pre>error!</pre>
}

const about = loadAsyncComponent(() => import('./view/about'), {loading, error})
const help = loadAsyncComponent(() => import('./view/help'), {loading, error})

function App() {

  return (
    <BrowserRouter>
      {/* <pre>{props.children}</pre> */}
      <Switch>
        <Route exact path='/' component={home} />
        <Redirect exact from='/home' to='/' />
        <Route exact path='/about' component={about} />
        <Route exact path='/help' component={help} />
        <Route component={notFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
