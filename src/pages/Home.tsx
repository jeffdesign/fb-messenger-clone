import React, { useState, useEffect } from "react"
import { firebaseLogout } from "../firebase/Actions"
import ChatList from "../components/ChatList/ChatList"
import ChatView from "../components/ChatView/ChatView"
import firebase from "../firebase/Config"

interface T {
  selectedChat: number | null
  newChatFormVisible: boolean
  email: string | null
  chats: firebase.firestore.DocumentData[]
}

const styles = {
  mainWrapper: {
    display: "flex",
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
  },
  chatListWrapper: {
    backgroundColor: "#313234",
    minWidth: "300px",
    color: "#fff",
    display: "flex",
    flex: "0 0 25%",
    flexDirection: "column",
  } as React.CSSProperties,
  chatViewWrapper: {
    backgroundColor: "#1c1d1f",
    color: "#fff",
    display: "flex",
    flex: 3,
    flexDirection: "column",
    minWidth: 0,
  } as React.CSSProperties,
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
    setState({ ...state, selectedChat: chatIndex, newChatFormVisible: true })
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
    <div style={styles.mainWrapper}>
      <div style={styles.chatListWrapper}>
        <h2>Messenger</h2>
        <button onClick={() => firebaseLogout()}>Logout</button>
        <ChatList
          newChatBtnClicked={newChatBtnClicked}
          selectChat={selectChat}
          userEmail={state.email}
          chats={state.chats}
          selectedChatIndex={state.selectedChat}
        />
      </div>
      <div style={styles.chatViewWrapper}>
        {state.newChatFormVisible && state.selectedChat !== null ? (
          <ChatView user={state.email} chat={state.chats[state.selectedChat]} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Home
