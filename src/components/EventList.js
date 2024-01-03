//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setFetchedData((prevData) => ({ ...prevData, isFetching: true }))

//         const { data, isLoading, isError, error } = useGetData(true, endpoint, {
//           ...paginationOptions,
//           ...searchOptions,
//         })

//         if (fetchedData.error) {
//           console.log("Error fetching data", fetchedData.error)
//           setFetchedData({
//             ...fetchedData,
//             isError: true,
//             error: fetchedData.error,
//           })
//         } else {
//           setFetchedData({
//             data: fetchedData.data?.data,
//             hits: fetchedData.data?.hits,
//             isLoading: false,
//             isError: false,
//             isFetching: false,
//             error: null,
//           })
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching data", error)
//         setFetchedData({
//           ...fetchedData,
//           isError: true,
//           error: error.message,
//           isFetching: false,
//         })
//       }
//     }

//     fetchData()
//   }, [endpoint, paginationOptions, searchOptions])

//   return useMemo(() => {
//     return (
//       <Container px={false}>
//         {fetchedData.isLoading && !fetchedData.data ? (
//           <HintLoading text="Loading services..." />
//         ) : (
//           <>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th className="icon-cell"></th>
//                   <th>Time</th>
//                   <th>Observer Type</th>
//                   <th>Action</th>
//                   <th>Target Type</th>
//                   <th>Initiator Name</th>
//                 </tr>
//               </thead>
//               {fetchedData.error ? (
//                 <tbody>
//                   <tr>
//                     <td colSpan="6">{fetchedData.error}</td>
//                   </tr>
//                 </tbody>
//               ) : fetchedData.data ? (
//                 fetchedData.data.map((event) => (
//                   <tbody key={event.id}>
//                     <Item event={event} />
//                     {event.detailsVisible && <ItemDetails event={event} />}
//                   </tbody>
//                 ))
//               ) : (
//                 <tbody>
//                   <tr>
//                     <td colSpan="6">No events found</td>
//                   </tr>
//                 </tbody>
//               )}
//               {fetchedData.isFetching && (
//                 <tbody>
//                   <tr>
//                     <td colSpan="6">
//                       <span className="spinner" />
//                     </td>
//                   </tr>
//                 </tbody>
//               )}
//             </table>
//             <Pagination
//               hits={fetchedData.hits}
//               limit={ITEMS_PER_PAGE}
//               onChanged={onPaginationChanged}
//               isFetching={fetchedData.isFetching}
//               disabled={fetchedData.isError}
//             />
//           </>
//         )}
//       </Container>
//     )
// }, [fetchedData])  const endpoint = useGlobalsEndpoint()
// const [paginationOptions, setPaginationOptions] = useState({
//   pageSize: ITEMS_PER_PAGE,
//   page: 0,
// })
// const [searchOptions, setSearchOptions] = useState({
//   project: "3e114e00af9e4494bc643aa6d554bdd1",
// })

// }

// export default EventList

// EventList.js
import React, { useState, useEffect, useMemo } from "react"
import { useGlobalsEndpoint } from "./StoreProvider"
import { useGetData } from "../queries"
import "./EventList.css"
import Pagination from "./Pagination"
import {
  Container,
  DataGrid,
  DataGridCell,
  DataGridHeadCell,
  DataGridRow,
} from "juno-ui-components"
import HintLoading from "./HintLoading"
import Item from "./Item"
import SearchBar from "./SearchBar"

const ITEMS_PER_PAGE = 15

const EventList = ({ children, className, ...props }) => {
  const endpoint = useGlobalsEndpoint()
  const [paginationOptions, setPaginationOptions] = useState({
    pageSize: ITEMS_PER_PAGE,
    page: 0,
  })
  const [searchOptions, setSearchOptions] = useState({
    from: "",
    subject: "",
    recipients: "",
    sender: "",
    messageId: "",
    start: null,
    end: null,
    project: "3e114e00af9e4494bc643aa6d554bdd1", // default project value
  })

  const fetchedData = useGetData(true, endpoint, {
    ...paginationOptions,
    ...searchOptions,
  })

  const [tableData, setTableData] = useState({
    data: null,
    hits: null,
    isLoading: true,
    isError: false,
    isFetching: false,
    error: null,
  })

  useEffect(() => {
    if (fetchedData && fetchedData.data) {
      setTableData({
        data: fetchedData.data.data,
        hits: fetchedData.data.hits,
        isLoading: fetchedData.isLoading,
        isError: fetchedData.isError,
        isFetching: fetchedData.isFetching,
        error: fetchedData.error,
      })
    }
  }, [fetchedData.data])

  const onPaginationChanged = (page, pageSize) => {
    setPaginationOptions({ page, pageSize })
  }

  const onSearchTerm = (options) => {
    setSearchOptions({
      ...options,
      project: "3e114e00af9e4494bc643aa6d554bdd1",
    })
  }

  return useMemo(() => {
    return (
      <Container style={{ height: "100%" }}>
        <SearchBar onChange={onSearchTerm} />

        {tableData.isLoading && !tableData.data ? (
          <HintLoading text="Loading Logs..." />
        ) : (
          <>
            <Pagination
              hits={tableData.hits}
              limit={ITEMS_PER_PAGE}
              onChanged={onPaginationChanged}
              isFetching={tableData.isFetching}
              disabled={!!tableData.error}
            />
            <DataGrid columns={5}>
              <DataGridRow>
                <DataGridHeadCell></DataGridHeadCell>
                <DataGridHeadCell>Time</DataGridHeadCell>
                <DataGridHeadCell>From</DataGridHeadCell>
                <DataGridHeadCell>To</DataGridHeadCell>
                <DataGridHeadCell>Subject</DataGridHeadCell>
              </DataGridRow>
              {tableData.error ? (
                // Your error handling here
                <DataGridRow>
                  <DataGridCell>{tableData.error}</DataGridCell>
                </DataGridRow>
              ) : tableData.data ? (
                tableData.data.map((event) => (
                  <Item event={event} key={event.id} />
                ))
              ) : (
                // Your no events found message here
                <DataGridRow>
                  <DataGridCell>No events found</DataGridCell>
                </DataGridRow>
              )}
              {tableData.isFetching && !tableData.data && (
                // Your loading spinner here
                <DataGridRow>
                  <DataGridCell>
                    <span className="spinner" />
                  </DataGridCell>
                </DataGridRow>
              )}
            </DataGrid>
          </>
        )}
      </Container>
    )
  }, [tableData, paginationOptions, searchOptions])
}
export default EventList
