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

// export const service = ({ queryKey }) => {
//   const [_key, bearerToken, endpoint, serviceId] = queryKey
//   return fetchFromAPI(bearerToken, endpoint, `/services/${serviceId}`)
// }

//
// COMMONS
//

const fetchFromAPI = async (bearerToken, endpoint, path, requestData) => {
  try {
    const response = await fetch(`${endpoint}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${bearerToken}`,
        "X-Auth-Token": bearerToken
      },
      body: JSON.stringify(requestData),
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

const f1etchFromAPI = (bearerToken, endpoint, path, options) => {
  const query = encodeUrlParamsFromObject(options)
  // return fetch(`${endpoint}${path}?${query}`, {
  return fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token":
        "gAAAAABljCmiVjV4M8kyXFR5pyI_d3JMV-c5xPRfqCOkxLMBhfmcFUVW9WA1aLU1n7mq27hQRdvN6B-colYwTleNY8hi7zhiXVBksFgB1Ynyv4pjJgfCXmpVs8S862iZ_YMXC_XYj0gxJtHf-qdsMqhLTILbs3Uq7TfddTKW3xFrXOxKkg1hRZfs2icfNL6DKGLI7A9bHyoMDnZZpWgIJkRasus_21dkBR2mFtDp4-8EDv1p7myFLYFh0VRcIbZiQx3p7nqN7cIM",

      // Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then(checkStatus)
    .then((response) => {
      let isJSON = response.headers
        .get("content-type")
        .includes("application/json")
      if (!isJSON) {
        var error = new HTTPError(
          400,
          "The response is not a valid JSON response"
        )
        return Promise.reject(error)
      }
      return response.json()
    })
}
