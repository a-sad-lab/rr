import {useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

function useNavigationGuard({blockCb, listenCb} = {}) {
  console.log('useNavigationGuard')
  const isFunc = function(fn) {
    return typeof(fn) === 'function'
  }
  const blocked = true
  const {block, listen} = useHistory()
  const usedLocation = useLocation()

  useEffect(function() {
    if(isFunc(blockCb)) {
      console.log({blockCb})
      const unblock = block(function(location, action) {
        if(blockCb(usedLocation, location, action) === blocked) {
          return false
        }else {
          unblock()
        }
      })
    }
    
    if(isFunc(listenCb)) {
      console.log({listenCb})
      return listen(function(location, action) {
        listenCb(usedLocation, location, action)
      })
    }
  })
}

export default useNavigationGuard
