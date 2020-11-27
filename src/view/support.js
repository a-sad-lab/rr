import {useState, useEffect} from 'react'
import Layout from './layout'

function Support(props) {
  console.log(`a - Support props`, props)
 
  const [s, setS] = useState('support')

  useEffect(function() {
    console.log(`c - effect - ${s}`)
    Promise.resolve().then(function() {
      console.log(`d - setState - ${s}`)
      setS('support support')
    })
  }, [])

  console.log(`b - Support returned - ${s}`)
  return (
    <Layout>
      <pre>[{s}] Support page</pre>
    </Layout>
  )
}

export default Support
