import React, { useMemo, useState, useEffect } from "react"
import { Stack, Button, TextInput, Form } from "juno-ui-components"
import Datetime from "react-datetime"
import moment from "moment"
const formStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
  alignItems: "center",
}

const SearchBar = ({ children, onChange, className, ...props }) => {
  const isValidDate = (date) =>
    // do not allow dates that are in the future
    !moment(date).isAfter()
  const [from, setFrom] = useState("")
  const [subject, setSubject] = useState("")
  const [recipients, setRecipients] = useState("")
  const [sender, setSender] = useState("")
  const [messageId, setMessageId] = useState("")
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  // const [project, setProject] = useState("")
  useEffect(() => {
    onChange({ from, subject, recipients, sender, messageId, start, end })
  }, [from, subject, recipients, sender, messageId, start, end])

  return (
    <>
      <Form style={formStyle}>
        <TextInput
          id="from"
          label="From"
          width="auto"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <TextInput
          id="subject"
          label="Subject"
          width="auto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextInput
          id="recipients"
          label="Recipients"
          width="auto"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
        <TextInput
          id="sender"
          label="Sender"
          width="auto"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <TextInput
          id="messageId"
          label="Message ID"
          width="auto"
          value={messageId}
          onChange={(e) => setMessageId(e.target.value)}
        />
        <label>Time range (UTC):</label>
        <Datetime
          // value={}
          textColor="black"
          id="start"
          inputProps={{ placeholder: "Select start time" }}
          isValidDate={isValidDate}
          timeFormat="HH:mm"
          onChange={(e) => setStart(e.format())}
          closeOnSelect
        />
        -
        <Datetime
          id="end"
          // value={}
          inputProps={{ placeholder: "Select end time" }}
          isValidDate={isValidDate}
          timeFormat="HH:mm"
          onChange={(e) => setEnd(e.format())}
          closeOnSelect
        />
      </Form>
    </>
  )
}

export default SearchBar
