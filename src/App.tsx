import React, { Fragment, useState, useEffect } from "react"
import firebase from "./firebase/config"
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./App.css"

function App() {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    handleUser()
  }, [])

  const handleUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }

  return <Fragment>{user ? <Home /> : <Login />}</Fragment>
}

export default App
