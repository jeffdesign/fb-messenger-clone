import React, { Fragment, useState } from "react"
import { firebaseLogin, firebaseSignup } from "../firebase/actions"

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const printValues = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
  }

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Fragment>
      <form onSubmit={printValues}>
        <input
          value={form.email}
          onChange={(event) => updateForm(event)}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          value={form.password}
          onChange={(event) => updateForm(event)}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={(event) => firebaseLogin({ event, form })}>
          Login
        </button>
        <button onClick={(event) => firebaseSignup({ event, form })}>
          Signup
        </button>
      </form>
    </Fragment>
  )
}

export default Login
