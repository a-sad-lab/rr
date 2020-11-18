import {useState, useEffect} from 'react'

function loadingNoop() {
  return null
}

function errorNoop() {
  return null
}

function useAsyncComponent(importFn, option = {loading: loadingNoop, error: errorNoop}) {

  const {loading: Loading, error: Error} = option

  const [componentFn, setComponentFn] = useState(function() {
    return Loading
  })

  useEffect(function() {
    importFn()
      .then(function(res) {
        const ResolvedComponent = res.default
        setComponentFn(function() {
          return function ResolvedComponentWrapper(props) {
            return <ResolvedComponent {...props} rt={'success'} />
          }
        })
      })
      .catch(function(err) {
        setComponentFn(function() {
          return function RejectedComponentWrapper(props) {
            return <Error err={err} {...props} />
          }
        })
      })
  }, [importFn])

  return componentFn
}

function loadAsyncComponent(toImport, option) {
  return function AsyncComponent(props) {
    const ComponentFn = useAsyncComponent(toImport, option)
    return <ComponentFn {...props} />
  }
}


export {
  loadAsyncComponent
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
