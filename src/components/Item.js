import moment from "moment"
import React, { useEffect, useState } from "react"
import { DataGridCell, DataGridRow, Icon, JsonViewer } from "juno-ui-components"
const Item = ({ event, children, className, ...props }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <>
      <DataGridRow>
        <DataGridCell>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              toggleDetails(event)
            }}
          >
            <Icon icon={showDetails ? "expandLess" : "expandMore"}></Icon>
          </a>
        </DataGridCell>
        <DataGridCell>
          {moment(event.date).format("YYYY-MM-DD, HH:mm:ss")}
          <p style={{ fontSize: "0.8rem" }}>
            UTC: {moment(event.date).utc().format("YYYY-MM-DD, HH:mm:ss")}
          </p>
        </DataGridCell>
        <DataGridCell>{event.from}</DataGridCell>
        <DataGridCell>
          {event.rcpts.map((item) => item.rcpt).join(", ")}
        </DataGridCell>
        <DataGridCell>{event.subject}</DataGridCell>
      </DataGridRow>

      {showDetails && (
        <DataGridRow>
          <DataGridCell colSpan={5}>
            <JsonViewer data={event} expanded={true}  />
          </DataGridCell>
        </DataGridRow>
      )}
    </>
  )
}

export default Item
