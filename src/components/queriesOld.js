import { useQuery } from "@tanstack/react-query"
import {
  logs,
} from "./actions"

// get all logs
export const getLogs = (bearerToken, endpoint, options) => {
    console.log("getLogs run")

  return useQuery({
    // queryKey: ["logs", bearerToken, endpoint, options],
    queryKey: ["logs", null, endpoint, options],
    queryFn: logs,
    // The query will not execute until the bearerToken exists
    enabled: true,
    // enabled: !!bearerToken,
    // The data from the last successful fetch available while new data is being requested, even though the query key has changed.
    // When the new data arrives, the previous data is seamlessly swapped to show the new data.
    // isPreviousData is made available to know what data the query is currently providing you
    keepPreviousData: true,
  })
}
