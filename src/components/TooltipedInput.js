import {
    TextInput,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "juno-ui-components"
import React, { useState } from "react"


const TooltipedInput = ({ id, label, value, tooltipContent,onChange  }) => {
  return (
    <Tooltip triggerEvent="hover" placement={"top-start"}>
      <TooltipTrigger asChild>
        <div>
        <TextInput
          id={id}
          label={label}
          width="auto"
          value={value}
          onChange={onChange}
        />
        </div>
      </TooltipTrigger>
       <TooltipContent>{tooltipContent}</TooltipContent> 
     </Tooltip>
  )
}

export default TooltipedInput
