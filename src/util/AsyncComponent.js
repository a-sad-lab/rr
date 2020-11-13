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
  }, [])

  return component
}

export {AsyncComponent}



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
