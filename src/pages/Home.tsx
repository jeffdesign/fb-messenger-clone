import React, { Fragment, useState, useEffect } from "react"
import { firebaseLogout } from "../firebase/Actions"
import ChatList from "../components/ChatList.tsx/ChatList"
import firebase from "../firebase/Config"

interface T {
  selectedChat: number | null
  newChatFormVisible: boolean
  email: string | null
  chats: firebase.firestore.DocumentData[]
}

const Home = ({ history }: any) => {
  const [state, setState] = useState<T>({
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    chats: [],
  })

  const selectChat = (chatIndex: any) => {
    console.log("Chat selected: " + chatIndex)
  }

  const newChatBtnClicked = () => {
    setState({ ...state, newChatFormVisible: true, selectedChat: null })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) history.push("/login")
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async (res) => {
            const chats = res.docs.map((_doc) => _doc.data())
            await setState({
              ...state,
              email: _usr.email,
              chats: chats,
            })
            console.log(state)
          })
      }
    })
  }, [state.email])

  return (
    <Fragment>
      <h2>Homepage</h2>
      <button onClick={() => firebaseLogout()}>Logout</button>
      <ChatList
        newChatBtnClicked={newChatBtnClicked}
        selectChat={selectChat}
        userEmail={state.email}
        chats={state.chats}
        selectedChatIndex={state.selectedChat}
      />
    </Fragment>
  )
}

export default Home
