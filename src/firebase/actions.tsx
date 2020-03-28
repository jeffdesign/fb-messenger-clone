import firebase from "./Config"

export const firebaseLogin = ({
  event,
  form,
}: {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  form: { email: string; password: string }
}) => {
  event.preventDefault()
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email, form.password)
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const firebaseSignup = ({
  event,
  form,
}: {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  form: { email: string; password: string }
}) => {
  event.preventDefault()
  firebase
    .auth()
    .createUserWithEmailAndPassword(form.email, form.password)
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const firebaseLogout = () => {
  firebase
    .auth()
    .signOut()
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}
