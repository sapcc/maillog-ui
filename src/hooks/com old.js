import { useEffect } from "react"
import { broadcast, get, watch } from "communicator"
import {
  useAuthAppLoaded,
  useAuthIsProcessing,
  useAuthError,
  useAuthLoggedIn,
  useAuthLastAction,
  useAuthActions,
} from "../components/StoreProvider"

const useCommunication = () => {

  console.log("[maillog] useCommunication setup")
  const authAppLoaded = useAuthAppLoaded()
  const authIsProcessing = useAuthIsProcessing()
  const authError = useAuthError()
  const authLoggedIn = useAuthLoggedIn()
  const authLastAction = useAuthLastAction()
  const { setData: authSetData, setAppLoaded: authSetAppLoaded } = useAuthActions()


  // allow maillog to login/logout the user. Visible when app is not in embedded mode
  useEffect(() => {
    if (!authAppLoaded || authIsProcessing || authError) return
    if (!authLoggedIn) {
      broadcast("AUTH_LOGIN", "maillog", { debug: false })
    } else {
      broadcast("AUTH_LOGOUT", "maillog")
    }
  }, [authAppLoaded, authIsProcessing, authError, authLoggedIn, authLastAction])

  useEffect(() => {
    if (!authSetData || !authSetAppLoaded) return

    get("AUTH_APP_LOADED", authSetAppLoaded)
    const unwatchLoaded = watch("AUTH_APP_LOADED", authSetAppLoaded)

    get("AUTH_GET_DATA", authSetData)
    const unwatchUpdate = watch("AUTH_UPDATE_DATA", authSetData)

    return () => {
      if (unwatchLoaded) unwatchLoaded()
      if (unwatchUpdate) unwatchUpdate()
    }
  }, [authSetData, authSetAppLoaded])
}

export default useCommunication



// import React, { useReducer, useEffect, useCallback } from "react"
// import { broadcast, get, watch } from "communicator"
// import { useGlobalsActions, useGlobalsAuth, useGlobalsLoggedIn, useGlobalsLogin, useGlobalsLogout } from "../components/StoreProvider"

// const useCommunication = () => {
//   console.log("[maillog] useCommunication setup")

//     const  setAuth  = useGlobalsAuth()
//     const setLoggedIn  = useGlobalsLoggedIn()
//     const setLoggedOut  = useGlobalsActions().setLogout
//     const setLogin  = useGlobalsActions().setLogin

//   useEffect(() => {
//     // get manually the current auth object in case the this app mist the first auth update message
//     // this is the case this app is loaded after the Auth app.
//           console.log("START setup")

//     get(
//       "AUTH_GET_DATA",
//       (data) => {
//         setAuth(data.auth)
//         setLoggedIn(data.loggedIn)
//       },
//       { debug: true }
//     )
//     // watch for auth updates messages
//     // with the watcher we get the auth object when this app is loaded before the Auth app
//     const unwatch = watch(
//       "AUTH_UPDATE_DATA",
//       (data) => {
//         setAuth(data.auth)
//         setLoggedIn(data.loggedIn)
//       },
//       { debug: true }
//     )
//       console.log("setup",unwatch)

//     return unwatch
//   }, [setAuth, setLoggedIn])

//   setLogin(() => {
//     broadcast("AUTH_LOGIN", "maillog", { debug: true })
//   })

//   setLoggedOut(() => {
//     broadcast("AUTH_LOGOUT", "maillog")
//   })
// }

// export default useCommunication
