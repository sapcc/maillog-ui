class HTTPError extends Error {
  constructor(code, message) {
    super(message || code)
    this.name = "HTTPError"
    this.statusCode = code
  }
}

export const encodeUrlParamsFromObject = (options) => {
  if (!options) return ""
  let encodedOptions = Object.keys(options)
    .map((k) => {
      if (typeof options[k] === "object") {
        const childOption = options[k]
        return Object.keys(childOption).map(
          (childKey) =>
            `${encodeURIComponent(childKey)}=${encodeURIComponent(
              childOption[childKey]
            )}`
        )
      }
      return `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`
    })
    .join("&")
  return `&${encodedOptions}`
}

const checkStatus = (response) => {
  if (response.status < 400) {
    return response
  } else {
    return response.text().then((message) => {
      var error = new HTTPError(response.status, message || response.statusText)
      error.statusCode = response.status
      return Promise.reject(error)
    })
  }
}

//
// SERVICES
//

export const dataFn = ({ queryKey }) => {
  const [_key, bearerToken, endpoint, options] = queryKey
  return fetchFromAPI(bearerToken, endpoint, "/v1/mails/search", options)
}



//
// COMMONS
//

const fetchFromAPI = async (bearerToken, endpoint, path, requestData) => {
  // Filter out null and empty string values from requestData
  const filteredRequestData = Object.entries(requestData).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== "") {
        acc[key] = value
      }
      return acc
    },
    {}
  )

  // Convert the filtered requestData to query parameters
  const queryParams = new URLSearchParams(filteredRequestData).toString()
  const url = `${endpoint}${path}?${queryParams}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${bearerToken}`, // Uncomment if needed
        "X-Auth-Token": bearerToken,
      },
      // The body is not used with GET requests, so it's removed
    })
    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      const jsonResponse = await response.json()
      return jsonResponse
    } else {
      // If the response status is not in the 2xx range, throw an error
      const errorResponse = await response.json()
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
      )
    }
  } catch (error) {
    console.error("An error occurred during the fetch:", error.message)
    throw error
  }
}
