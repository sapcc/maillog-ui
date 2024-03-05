import moment from "moment"
import React, { useEffect, useState } from "react"
import {
  DataGridCell,
  DataGridRow,
  Icon,
  JsonViewer,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "juno-ui-components"
import ItemDetails from "./ItemDetails"
const Item = ({ data, children, className, ...props }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }
  const downloadJsonFile = () => {
    const jsonString = JSON.stringify(data, null, 2) // The third parameter (2) adds indentation for better readability
    const blob = new Blob([jsonString], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = data.id || "data.json"
    link.click()
  }
  return (
    <>
      <DataGridRow>
        <DataGridCell>
          <Tooltip triggerEvent="hover">
            <TooltipTrigger asChild>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  toggleDetails(data)
                }}
              >
                <Icon icon={showDetails ? "expandLess" : "expandMore"}></Icon>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              {showDetails ? "Hide details" : "Show details"}
            </TooltipContent>
          </Tooltip>
        </DataGridCell>
        <DataGridCell>
          {moment(data.date).format("YYYY-MM-DD, HH:mm:ss")}
          <p style={{ fontSize: "0.8rem" }}>
            UTC: {moment(data.date).utc().format("YYYY-MM-DD, HH:mm:ss")}
          </p>
        </DataGridCell>
        <DataGridCell>{data.from}</DataGridCell>
        <DataGridCell>
          {data?.rcpts && data.rcpts.map((item) => item.rcpt).join(", ")}
        </DataGridCell>
        <DataGridCell>{data.subject}</DataGridCell>

        <DataGridCell>
          <Icon
            color="jn-text-theme-info"
            onClick={downloadJsonFile}
            icon="download"
          ></Icon>
        </DataGridCell>
      </DataGridRow>

      {showDetails && <ItemDetails data={data} />}
    </>
  )
}

export default Item
