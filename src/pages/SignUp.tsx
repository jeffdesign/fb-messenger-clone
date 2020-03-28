import React, { useCallback } from "react"
import { withRouter } from "react-router"
import firebase from "../firebase/Config"

const SignUp = ({ history }: any) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
        history.push("/")
      } catch (error) {
        alert(error)
      }
    },
    [history],
  )

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default withRouter(SignUp)
