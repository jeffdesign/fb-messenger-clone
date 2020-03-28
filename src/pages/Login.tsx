import React, { useCallback, useContext, CSSProperties } from "react"
import { withRouter, Redirect } from "react-router"
import firebase from "../firebase/Config"
import { AuthContext } from "../firebase/Auth"
import logo from "../assets/img/logo.png"

const Login = ({ history }: any) => {
  const styles = {
    body: { padding: "65px 30px", maxWidth: "1020px", margin: "auto" },
    wrapper: {
      width: "calc(100% - 70px)",
      padding: "70px 0 10px",
      textAlign: "center",
    } as React.CSSProperties,
    input: {
      margin: "auto",
      background: "#ffffff",
      border: "1px solid rgba(0, 0, 0, .20)",
      borderRadius: "4px",
      boxSizing: "border-box",
      color: "rgba(0, 0, 0, 1)",
      display: "block",
      fontSize: "17px",
      height: "42px",
      marginBottom: "12px",
      padding: "8px 16px",
      width: "286px",
    } as React.CSSProperties,
    button: {
      margin: "auto",
      backgroundColor: "#0084ff",
      border: "1px solid #0084ff",
      marginTop: "20px",
      marginBottom: "12px",
      padding: "2px 20px 0",
      height: "40px",
      color: "#ffffff",
      borderRadius: "24px",
      fontSize: "19px",
      lineHeight: "19px",
      fontWeight: 600,
      display: "block",
    },
    title: {
      fontSize: "40px",
      fontWeight: 300,
      color: "rgba(0,0,0,1)",
    },
    text: {
      color: "rgba(0,0,0,1)",
      fontSize: "16px",
      fontWeight: 200,
      lineHeight: 1.2,
      marginBottom: "24px",
    },
  }

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
    <div style={styles.body}>
      <div style={styles.wrapper}>
        <img src={logo} alt="Logo" />
        <h1 style={styles.title}>Messenger</h1>
        <p style={styles.text}>Sign in with email to get started</p>
        <form onSubmit={firebaseLogin}>
          <label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={styles.input}
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={styles.input}
            />
          </label>
          <button style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)
