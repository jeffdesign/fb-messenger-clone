import React, { useEffect, useState } from "react"
import firebase from "./Config"

export const AuthContext = React.createContext({ currentUser: undefined })

export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined | any
  >(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
