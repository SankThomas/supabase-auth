import { ChakraProvider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { supabase } from "./client"
import Account from "./components/Account"
import Auth from "./components/Auth"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <ChakraProvider>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </ChakraProvider>
  )
}
