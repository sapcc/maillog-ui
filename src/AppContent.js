import React, { useCallback, useEffect } from "react"
import { Container } from "juno-ui-components"
import EventList from "./components/EventList"
import { useAuth } from "./components/StoreProvider"

// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = (props) => {
  // hureka/appRouter.

  // const auth = useGlobalAuth((state) => state.auth)
  // const endpoint = useStore(useCallback((state) => state.endpoint))

  // const [servicesPaginationOptions, setServicesPaginationOptions] = useState({
  //   limit: ITEMS_PER_PAGE,
  //   offset: 0,
  // })

  //  const services = ({ queryKey }) => {
  //   const [_key, bearerToken, endpoint, options] = queryKey
  //   return fetchFromAPI(bearerToken, endpoint, "/", options)
  // }
  //   const getData = (bearerToken, endpoint, options) => {
  //   return useQuery({
  //     queryKey: ["services", bearerToken, endpoint, options],
  //     queryFn: services,
  //     // The query will not execute until the bearerToken exists
  //     enabled: !!bearerToken,
  //     // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
  //     // When the new data arrives, the previous data is seamlessly swapped to show the new data.
  //     // isPreviousData is made available to know what data the query is currently providing you
  //     keepPreviousData: true,
  //   })
  // }
  // const data = getData(auth?.id_token, endpoint, {})

  return (
    <>
      <EventList />
    </>
  )
}

export default AppContent
