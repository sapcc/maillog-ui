import React, { useState, useEffect } from 'react'
import { useAuth, useGlobalsEndpoint } from './StoreProvider'
import { getData } from '../queries'

const ITEMS_PER_PAGE = 10
// Look at hureka/Services and audit/lisst...
export const EventList = ({
  children,
  className,
  ...props
}) => {

  
  const endpoint = useGlobalsEndpoint()
  const auth = useAuth()
  const [paginationOptions, setPaginationOptions] = useState({
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })
  const [searchOptions, setSearchOptions] = useState({})
  console.log("auth", auth)
  const fetchedData = getData(true, endpoint, {...paginationOptions,...searchOptions,})
  // const filters = getServiceFilters(auth?.id_token, endpoint)

  // dispatch error with useEffect because error variable will first set once all retries did not succeed
  useEffect(() => {
    if (fetchedData.error) {
      console.log(
         "error",
        parseError(fetchedData.error),
      )
    }
  }, [fetchedData.error])

  // useEffect(() => {
  //   if (filters.error) {
  //     addMessage({
  //       variant: "error",
  //       text: parseError(filters.error),
  //     })
  //   }
  // }, [filters.error])

  const onPaginationChanged = (offset) => {
    setPaginationOptions({ ...paginationOptions, offset: offset })
  }

  const onSearchTerm = (options) => {
    setSearchOptions(options)
  }
    return (
      <div >
   inside event list
          <>
         
           {/* {fetchedData.data} */}
            {/* <Pagination
              count={fetchedData.data?.Count}
              limit={ITEMS_PER_PAGE}
              onChanged={onPaginationChanged}
              isFetching={fetchedData.isFetching}
              disabled={fetchedData.isError}
            /> */}
          </>
        
      </div>
    )








  // // const [servicesPaginationOptions, setServicesPaginationOptions] = useState({
  // //   limit: ITEMS_PER_PAGE,
  // //   offset: 0,

  // // })

  // // const [servicesSearchOptions, setServicesSearchOptions] = useState({
  // //   operators: "c5321213",
  // // })
 
  // console.log("endpoint = ", endpoint)
  
  //   const services = getLogs(auth?.id_token, endpoint, {
  //   // ...servicesPaginationOptions,
  //   // ...servicesSearchOptions,
  //   })
  
  

  // // const queryClient = useQueryClient()
  // // // const { status, data, error, isFetching } = useFetch()
  
  
  // return (
  //   <div>
  //     <h1>Event List</h1>
  //     <div>
  //       {/* {status === 'pending' ? (
  //         'Loading...'
  //       ) : status === 'error' ? (
  //         <span>Error: {error.message}</span>
  //       ) : (
  //         <>
  //           <div>
  //             {data}
  //           </div>
  //           <div>{isFetching ? 'Background Updating...' : ' '}</div> */}
  //         {/* </> */}
  //       {/* )} */}
  //     </div>
  //   </div>
  // )
}


export default EventList
