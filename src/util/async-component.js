import {useState, useEffect} from 'react'

function useAsyncComponent(importFn, option = {}) {
  console.log('b - useAsyncComponent')
  const importFnAsKey = importFn.toString()
  const {loading: Loading, error: Error} = option

  const [Component, setComponent] = useState(function() {
    return useAsyncComponent[importFnAsKey] || Loading || function() {return null}
  })

  useEffect(function() {
    console.log('e - useAsyncComponent effect', window.location.href)
    importFn()
      .then(function(res) {
        setComponent(function() {
          console.log('f - useAsyncComponent setState(resolve)', res.default.name)
          useAsyncComponent[importFnAsKey] = res.default
          return res.default
        })
      })
      .catch(function(err) {
        setComponent(function() {
          console.log('useAsyncComponent setState(rejected)')
          // 若需要向返回的函数式组件，传入额外的 props，使用下方策略
          return function RejectedComponentWrapper(props) {
            return Error ? <Error err={err} {...props} /> : null
          }
        })
      })
  })
  console.log('c - useAsyncComponent returned')
  return Component
}

function loadAsyncComponent(toImport, option) {
  return function AsyncComponentWrapper(props) {
    console.log('a - AsyncComponentWrapper')
    const Component = useAsyncComponent(toImport, option)
    console.log('d - AsyncComponentWrapper returned')
    return <Component {...props} />
  }
}

export {
  loadAsyncComponent
}

