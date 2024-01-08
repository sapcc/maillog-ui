import React, { useMemo, useState, useEffect, useRef } from "react"
import { Stack, Button, TextInput, Form } from "juno-ui-components"
import Datetime from "react-datetime"
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
  className,
  ...props
}) => {
  const isValidDate = (date) => !moment(date).isAfter()

  const handleSearchChanges = (newOptions) => {
    onChange({ ...searchOptions, ...newOptions })
  }

  const handleClear = () => {
    onChange({
      ...searchOptions,
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
          onChange={(e) =>
            handleSearchChanges({ rcpt: e.target.value.split(",") })
          }
        />
        <TextInput
          id="messageId"
          label="Message ID"
          width="auto"
          value={searchOptions.messageId}
          onChange={(e) => handleSearchChanges({ messageId: e.target.value })}
        />
        <TextInput
          id="id"
          label="Cronus Request ID"
          width="auto"
          value={searchOptions.id}
          onChange={(e) => handleSearchChanges({ id: e.target.value })}
        />
        {/* <TextInput
          id="queueId"
          label="Queue ID"
          width="auto"
          value={queueId}
          onChange={(e) => setSender(e.target.value)}
        /> */}
        <div style={flexStyle}>
          <label>Time range (UTC):</label>
          <Datetime
            id="start"
            inputProps={{ placeholder: "Select start time" }}
            isValidDate={isValidDate}
            timeFormat="HH:mm"
            onChange={(e) => handleSearchChanges({ start: e.format() })}
            closeOnSelect
          />
          &ndash;
          <Datetime
            id="end"
            inputProps={{ placeholder: "Select end time" }}
            isValidDate={isValidDate}
            timeFormat="HH:mm"
            onChange={(e) => handleSearchChanges({ end: e.format() })}
            closeOnSelect
          />
        </div>
        <Button
          onClick={handleClear}
          style={{
            position: "absolute",
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
