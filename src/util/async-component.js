import {useState, useEffect} from 'react'

function AsyncComponent(props) {
  const {promised} = props
  const [component, setComponent] = useState(<pre>loading......</pre>)
  console.log(props)
  useEffect(function() {
    promised
      .then(function(res) {
        console.log({res})
        setComponent(<pre>loaded!</pre>)
      })
      .catch(function(err) {
        console.log({err})
        setComponent(<pre>error!</pre>)
      })
  }, [promised])

  return component
}

function load(promisedConponent) {
  return function(props) {
    return <AsyncComponent promised={promisedConponent} {...props} />
  }
}

function Loading(props) {
  console.log('loading props', props)
  return <pre>loading......</pre>
}

function Error(props) {
  console.log('error props', props)
  return <pre>error</pre>
}

function AC(props) {
  const {toImport, ...other} = props
  const [component, setComponent] = useState(<Loading {...other} />)


  useEffect(function() {
    toImport()
      .then(function(res) {
        const Cmp = res.default
        setComponent(<Cmp {...other} />)
      })
      .catch(function(err) {
        console.log({err})
        setComponent(<Error {...other} err={err} />)
      })
  }, [])

  return component
}

function forComponent(toImport) {
  return function Component(props) {
    return <AC toImport={toImport} {...props} />
  }
}


export {
  load,
  AsyncComponent,
  AC,
  forComponent
}



// function AsyncComponent(props) {
//   const [component, setComponent] = useState(<pre>loading...... `{props.path}`</pre>)
//   console.log(props)
//   const {path} = props
//   useEffect(function() {
//     import(path)
//       .then(function(res) {
//         console.log({res})
//       }).catch(function(err) {
//         console.log({err})
//       })
//     setComponent(<pre>loaded `{props.path}` component</pre>)
//   }, [props.path])
  
//   return component
// }

// function loadAsyncComponent(path) {
//   return function(props) {
//     return <AsyncComponent path={path} {...props} />
//   }
// }

// export default null
