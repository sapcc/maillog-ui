import React from "react"
import { Button, TextInput, Form, DateTimePicker } from "juno-ui-components"
import moment from "moment"

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

  const handleSearchChanges = (newOptions) => {
    onChange({ ...searchOptions, ...newOptions })
    onPageChange({ ...pageOptions, page: 0 }) 
  }
  const handleDate = (date) => {
    onDateChange({...date})
  }
  const handleClear = () => {
    onChange({
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
  }

  return (
    <>
      <Form style={formStyle}>
        <TextInput
          id="from"
          label="Envelope From"
          width="auto"
          value={searchOptions.from}
          onChange={(e) => handleSearchChanges({ from: e.target.value })}
        />
        <TextInput
          id="headerFrom"
          label="Header From"
          width="auto"
          value={searchOptions.headerFrom}
          onChange={(e) => handleSearchChanges({ headerFrom: e.target.value })}
        />
        <TextInput
          id="subject"
          label="Subject"
          width="auto"
          value={searchOptions.subject}
          onChange={(e) => handleSearchChanges({ subject: e.target.value })}
        />
        <TextInput
          id="rcpt"
          label="Recipients"
          width="auto"
          value={searchOptions.rcpt.join(",")}
          onChange={(e) =>handleSearchChanges({ rcpt: e.target.value.split(",") })}
        />
        <TextInput
          id="messageId"
          label="Message ID"
          width="auto"
          value={searchOptions.messageId}
          onChange={(e) => {
            let messageId = e.target.value.trim()

            // Ensure messageId is wrapped with '<' and '>' if it's not empty
            if (
              messageId &&
              !messageId.startsWith("<") &&
              !messageId.endsWith(">")
            ) {
              messageId = `<${messageId}>`
            }

            // Pass the potentially modified messageId to handleSearchChanges
            handleSearchChanges({ messageId })
          }}
        />
        <TextInput
          id="id"
          label="Cronus Request ID"
          width="auto"
          value={searchOptions.id}
          onChange={(e) => handleSearchChanges({ id: e.target.value })}
        />
        <Button
          onClick={handleClear}
          style={{
            right: "2rem",
            top: "1rem",
          }}
        >
          Clear All Filters
        </Button>
        <div style={flexStyle}>
          <label style={{    "flex-shrink": 0}}>Time range (UTC):</label>
          <DateTimePicker
            onChange={(value) => {
              handleDate({
                start:
                  value && isNaN(new Date(value)) === false ? value[0] : "",
              })
            }}
            id="start"
            label="Select a start date"
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
            label="Select a end date"
            enableTime={true}
            time_24hr
          />
        </div>
      </Form>
    </>
  )
}

export default SearchBar
