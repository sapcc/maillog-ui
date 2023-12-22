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
  // return fetchFromAPI(bearerToken, endpoint, "/", options)
  return fetchFromAPI(bearerToken, endpoint, "/", options)

}

// export const service = ({ queryKey }) => {
//   const [_key, bearerToken, endpoint, serviceId] = queryKey
//   return fetchFromAPI(bearerToken, endpoint, `/services/${serviceId}`)
// }


//
// COMMONS
//

const fetchFromAPI = (bearerToken, endpoint, path, options) => {
  const query = encodeUrlParamsFromObject(options)
  return fetch(`${endpoint}${path}?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
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
