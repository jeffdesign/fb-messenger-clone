import React, { Fragment } from "react"
import { firebaseLogout } from "../firebase/Actions"

const Home = () => {
  return (
    <Fragment>
      <h2>Homepage</h2>
      <button onClick={() => firebaseLogout()}>Logout</button>
    </Fragment>
  )
}

export default Home
