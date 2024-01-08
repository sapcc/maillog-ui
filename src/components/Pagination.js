import React, { useMemo, useState, useEffect } from "react"
import {
  Stack,
  Button,
  Select,
  SelectOption,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "juno-ui-components"

const Pagination = ({ hits, pageSize, onChanged, isFetching, disabled }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize || 10)

  useEffect(() => {
    if (onChanged) onChanged({ page: currentPage, pageSize: selectedPageSize })
  }, [currentPage, selectedPageSize])

  hits = useMemo(() => {
    return hits || 0
  }, [hits])

  const totalPages = useMemo(() => {
    return Math.ceil(hits / selectedPageSize)
  }, [hits, selectedPageSize])

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

  const pageSizeOptions = ["15", "30", "50", "100"]

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
          placeholder={String(selectedPageSize)}
          value={String(selectedPageSize)}
          onChange={(value) => setSelectedPageSize(Number(value))}
        >
          {pageSizeOptions.map((value) => (
            <SelectOption value={value} key={value} />
          ))}
        </Select>
      </Stack>
    </>
  )
}

export default Pagination
