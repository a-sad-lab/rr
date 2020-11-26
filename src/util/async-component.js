import {
  useState, useEffect
} from 'react'

function useAsyncComponent(importFn, option = {}) {
  const importFnAsKey = importFn.toString()
  const {loading: Loading, error: Error} = option

  const [Component, setComponent] = useState(function() {
    return useAsyncComponent[importFnAsKey] || Loading || function() {return null}
  })

  useEffect(function() {
    console.log('use useAsyncComponent effect', window.location.href)
    importFn()
      .then(function(res) {
        console.log('hi res')
        setComponent(function() {
          console.log('set state ac')
          useAsyncComponent[importFnAsKey] = res.default
          return res.default
        })
      })
      .catch(function(err) {
        setComponent(function() {
          // 若需要向返回的函数式组件，传入额外的 props，使用下方策略
          return function RejectedComponentWrapper(props) {
            return Error ? <Error err={err} {...props} /> : null
          }
        })
      })
  })

  return Component
}

function loadAsyncComponent(toImport, option) {
  
  return function AsyncComponent(props) {
    console.log('Async Component Wrapper')
    const Component = useAsyncComponent(toImport, option)
    return <Component {...props} />
  }

}


export {
  loadAsyncComponent
}

