import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./firebase/Auth"

const PrivateRoute = ({
  component: RouteComponent,
  ...rest
}: {
  [x: string]: any
  component: any
}) => {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser === null ? (
          <Redirect to={"/login"} />
        ) : currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <div>Laddar..</div>
        )
      }
    />
  )
}

export default PrivateRoute
