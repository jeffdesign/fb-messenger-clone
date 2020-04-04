import React, { useState, useEffect } from "react"
import { firebaseLogout } from "../firebase/Actions"
import ChatList from "../components/ChatList/ChatList"
import ChatView from "../components/ChatView/ChatView"
import ChatTextBox from "../components/ChatTextBox/ChatTextBox"

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
    console.log(history)
    setState({ ...state, selectedChat: chatIndex, newChatFormVisible: true })
  }

  const newChatBtnClicked = () => {
    // setState({ ...state, newChatFormVisible: true, selectedChat: null })
  }

  useEffect(() => {
    if (state.selectedChat === null) {
      firebase.auth().onAuthStateChanged(async (_usr) => {
        if (!_usr) history.push("/login")
        else {
          firebase
            .firestore()
            .collection("chats")
            .where("users", "array-contains", _usr.email)
            .onSnapshot(async (res) => {
              const chats = res.docs.map((_doc) => _doc.data())
              setState({
                newChatFormVisible: false,
                selectedChat: 0,
                email: _usr.email,
                chats: chats,
              })
            })
        }
      })
    }
  }, [])

  const submitMessage = (msg: any) => {
    const docKey =
      (state.selectedChat !== null &&
        buildDocKey(
          state.chats[state.selectedChat].users.filter(
            (user: any) => user !== state.email,
          )[0],
        )) ||
      undefined

    console.log(docKey)

    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: state.email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      })

    console.log(state.selectedChat)

    setState({
      ...state,
      selectedChat: state.selectedChat,
      newChatFormVisible: true,
    })
  }

  const buildDocKey = (friend: any) =>
    [state.email, friend].sort().reverse().join(":")

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
        {state.newChatFormVisible && state.selectedChat !== null && (
          <ChatView user={state.email} chat={state.chats[state.selectedChat]} />
        )}
        {state.newChatFormVisible && state.selectedChat !== null && (
          <ChatTextBox submitMessageFn={submitMessage} />
        )}
      </div>
    </div>
  )
}

export default Home
