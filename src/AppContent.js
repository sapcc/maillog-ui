import React, { useCallback, useEffect } from "react"
import { Container } from "juno-ui-components"
import EventList from "./components/EventList"
import { useAuth } from "./components/StoreProvider"

// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = ({props}) => {
  return (
    <>
      <EventList props={props}/>
    </>
  )
}

export default AppContent
