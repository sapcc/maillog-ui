import React, { useMemo, useState, useEffect } from "react"
import { Stack, Button, Select, SelectOption } from "juno-ui-components"

const Pagination = ({ hits, limit, onChanged, isFetching, disabled }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLimit, setSelectedLimit] = useState(limit || 10)

  useEffect(() => {
    if (onChanged) onChanged(currentPage, selectedLimit)
  }, [currentPage, selectedLimit])

  hits = useMemo(() => {
    return hits || 0
  }, [hits])

  const totalPages = useMemo(() => {
    return Math.ceil(hits / selectedLimit)
  }, [hits, selectedLimit])

  const onPrevChanged = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const onNextChanged = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const onLimitChange = (value) => {
    setSelectedLimit(value)
  }

  const limitOptions = ["15", "30", "50", "100"]

  return (
    <>
      <Stack
        alignment="center"
        className="mt-4"
        distribution="end"
        style={{ marginBottom: "15px" }}
      >
        <Button
          className="ml-4"
          disabled={currentPage === 1 || disabled}
          label="<"
          onClick={onPrevChanged}
          size="small"
        />
        <p className="ml-4">
          {currentPage} / {totalPages}
        </p>
        <Button
          disabled={currentPage === totalPages || disabled}
          className="ml-4"
          label=">"
          onClick={onNextChanged}
          size="small"
        />
        <Select
          style={{ marginLeft: "15px" }}
          width="auto"
          placeholder={String(selectedLimit)}
          value={String(selectedLimit)}
          onChange={(value) => onLimitChange(Number(value))}
        >
          {limitOptions.map((value) => (
            <SelectOption value={value} key={value} />
          ))}
        </Select>
      </Stack>
    </>
  )
}

export default Pagination

// import React, { useMemo, useState, useEffect } from "react"
// import { Stack, Button } from "juno-ui-components"

// const Pagination = ({ hits, limit, onChanged, isFetching, disabled }) => {
//   const [currentPage, setCurrentPage] = useState(1)

//   useEffect(() => {
//     if (onChanged) onChanged(currentPage)
//   }, [currentPage])

//   hits = useMemo(() => {
//     return hits || 0
//   }, [hits])

//   limit = useMemo(() => {
//     return limit || 10
//   }, [limit])

//   const totalPages = useMemo(() => {
//     return Math.ceil(hits / limit)
//   }, [hits, limit])

//   const onPrevChanged = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   const onNextChanged = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   return (
//     <>
//       <Stack alignment="center" className="mt-4" distribution="end">
//         <Button
//           className="ml-4"
//           disabled={currentPage === 1 || disabled}
//           label="<"
//           onClick={onPrevChanged}
//           size="small"
//         />
//         <p className="ml-4">
//           {currentPage} / {totalPages}
//         </p>
//         <Button
//           disabled={currentPage === totalPages || disabled}
//           className="ml-4"
//           label=">"
//           onClick={onNextChanged}
//           size="small"
//         />
//       </Stack>
//     </>
//   )
// }

// export default Pagination
