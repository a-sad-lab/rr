import {
  useState, useEffect
} from 'react'

function loadingNoop() {
  return null
}

function errorNoop() {
  return null
}

function useAsyncComponent(importFn, option = {loading: loadingNoop, error: errorNoop}) {
  console.log('ac')
  const {loading: Loading, error: Error} = option

  const [componentFn, setComponentFn] = useState(function() {
    return Loading
  })

  useEffect(function() {
    importFn()
      .then(function(res) {
        setComponentFn(function() {
          return res.default
        })
      })
      .catch(function(err) {
        setComponentFn(function() {
          // 若需要向返回的函数式组件，传入额外的 props，使用下方策略
          return function RejectedComponentWrapper(props) {
            return <Error err={err} {...props} />
          }
        })
      })
  }, [importFn])

  return componentFn
}

function loadAsyncComponent(toImport, option) {
  
  function AsyncComponent(props) {
    const ComponentFn = useAsyncComponent(toImport, option)
    return <ComponentFn {...props} />
  }

  return AsyncComponent
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
