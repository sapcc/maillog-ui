import React from "react"
import { AppShell, AppShellProvider } from "juno-ui-components"
import StoreProvider, {
  useAuthActions,
  useGlobalsActions,
} from "./components/StoreProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppContent from "./AppContent"
import styles from "./styles.scss"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "maillog"
/* --------------------------- */

const App = ({ ...props }) => {
  const { setAuthData } = useAuthActions()
  React.useEffect(() => {
    let timer
    const getToken = () =>
      // [_]A
      window._getCurrentToken().then((token) => {  
        const authToken = token.authToken
        // can also take project id from token.project.id
        setAuthData( {token: authToken, project: props.project })
        console.log("data was set, token: ", authToken," project: ", props.project)
        timer = setTimeout(getToken, new Date(token.expires_at).getTime())
      })
    getToken()
    return () => clearTimeout(timer)
  },[setAuthData] )
  
  const { setEndpoint, setUrlStateKey, setEmbedded } = useGlobalsActions()
  // Create query client which it can be used from overall in the app
  // set default endpoint to fetch data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
        },
      },
    },
  })
  if (props.endpoint) {
    setEndpoint(props.endpoint)
    console.log("endpoint was set", props.endpoint)
  }

  React.useEffect(() => {
    setEmbedded(props?.embedded === true || props?.embedded === "true")
  }, [props])

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | Maillog"
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <AppContent props={props} />
      </AppShell>
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-light"}`}>
      {/* load styles inside the shadow dom */}

      <style>{styles.toString()}</style>
      <StoreProvider>
        {/* <GetToken/> */}
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  )
}

export default StyledApp
