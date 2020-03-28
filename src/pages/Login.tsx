import React, { useCallback, useContext } from "react"
import { withRouter, Redirect } from "react-router"
import firebase from "../firebase/Config"
import { AuthContext } from "../firebase/Auth"

const Login = ({ history }: any) => {
  const firebaseLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement> | any) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push("/")
      } catch (error) {
        console.log(error)
      }
    },
    [history],
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <form onSubmit={firebaseLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button>Login</button>
      </form>
    </>
  )
}

export default withRouter(Login)
