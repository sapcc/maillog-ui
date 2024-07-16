import React from "react"
import { Button, TextInput, Form, DateTimePicker } from "juno-ui-components"
import moment from "moment"
import TooltipedInput from "./TooltipedInput"

const formStyle = {
  display: "flex",
  justifyContent: "normal",
  marginTop: "15px",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
}
const flexStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexShrink: 0,
  alignItems: "center",
  gap: 10,
}

const SearchBar = ({
  children,
  onChange,
  searchOptions,
  onPageChange,
  onDateChange,
  pageOptions,
  dateOptions,
  className,
  ...props
}) => {
  
  const isValidDate = (date) => date != "" && !moment(date).isAfter()
  const [reRender, setReRender] = React.useState(0)
  const handleSearchChanges = (newOptions) => {
    onChange({ ...searchOptions, ...newOptions })
    onPageChange({ ...pageOptions, page: 1 }) 
  }
  const handleDate = (date) => {
    onDateChange({...date})
  }
  const handleClear = () => {
    handleSearchChanges({
      ...searchOptions,
      page: 0,
      from: "",
      subject: "",
      rcpt: [],
      messageId: "",
      headerFrom: "",
      id: "",
      start: null,
      end: null,
    })
    setReRender(reRender + 1)
  }

  return (
    <>
      <Form style={formStyle} key={reRender}>
        <TooltipedInput
          tooltipContent="Search By Sender Address"
          id="from"
          label="Envelope From"
          width="auto"
          value={searchOptions.from}
          onChange={(e) => handleSearchChanges({ from: e.target.value })}
        />
        <TooltipedInput
          tooltipContent="Search By The HeaderFrom Field"          
          id="headerFrom"
          label="Header From"
          width="auto"
          value={searchOptions.headerFrom}
          onChange={(e) => handleSearchChanges({ headerFrom: e.target.value })}
        />
        <TooltipedInput
          tooltipContent="Search By Recipients, Separated By ','"          
          id="rcpt"
          label="Recipients"
          width="auto"
          value={searchOptions.rcpt.join(",")}
          onChange={(e) =>handleSearchChanges({ rcpt: e.target.value.split(",") })}
        />
        <TooltipedInput
          tooltipContent="Search By Subject"
          id="subject"
          label="Subject"
          width="auto"
          value={searchOptions.subject}
          onChange={(e) => handleSearchChanges({ subject: e.target.value })}
        />
        <TooltipedInput
          tooltipContent="Search By Message ID, Must Be Written As <MessageID>"
          id="messageId"
          label="Message ID"
          width="auto"
          value={searchOptions.messageId}
          onChange={(e) => {
            let messageId = e.target.value.trim()
            handleSearchChanges({ messageId })
          }}
        />
        <TooltipedInput
          tooltipContent="Search By Cronus Request ID"
          id="id"
          label="Cronus Request ID"
          width="auto"
          value={searchOptions.id}
          onChange={(e) => handleSearchChanges({ id: e.target.value })}
        />
        <div style={flexStyle}>
          <label style={{    "flexShrink": 0}}>Time Range (UTC):</label>
          <DateTimePicker
            onChange={(value) => {
              handleDate({
                start:
                  value && isNaN(new Date(value)) === false ? value[0] : "",
              })
            }}
            id="start"
            label="Start Date"
            enableTime={true}
            time_24hr
          />
          &ndash;
          <DateTimePicker
            onChange={(value) => {
              handleDate({
                end:
                  value && isNaN(new Date(value)) === false ? value[0] : "",
              })
            }}
            id="end"
            label="End Date"
            enableTime={true}
            time_24hr
          />
        </div>
        
        <Button
          onClick={handleClear}
          style={{
            right: "2rem",
            top: "1rem",
          }}
        >
          Clear All Filters
        </Button>
      </Form>
    </>
  )
}


export default SearchBar