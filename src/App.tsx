import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { AuthProvider } from "./firebase/Auth"
import PrivateRoute from "./PrivateRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </>
      </Router>
    </AuthProvider>
  )
}

export default App
