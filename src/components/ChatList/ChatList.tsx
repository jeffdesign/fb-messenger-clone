import React from "react"
import { styles } from "./styles"

const newChat = () => {
  console.log("new chat click")
}

const ChatList = ({
  newChatBtnClicked,
  selectChat,
  userEmail,
  chats,
  selectedChatIndex,
}: {
  newChatBtnClicked: any
  selectChat: any
  userEmail: any
  chats: firebase.firestore.DocumentData[]
  selectedChatIndex: any
}) => {
  const List = () => (
    <div style={styles.wrapper}>
      <button onClick={() => newChat}>New chat</button>
      <ul>
        {chats.map((chat: firebase.firestore.DocumentData, idx: number) => {
          return (
            <li
              style={(selectedChatIndex === idx && styles.activeChat) || {}}
              onClick={() => selectChat(idx)}
              key={idx}
            >
              <span>
                {chat.users.filter((user: any) => user !== userEmail)[0]}
              </span>
              <span>: </span>
              <span>
                {chat.messages[chat.messages.length - 1].message.length >= 30
                  ? `${chat.messages[
                      chat.messages.length - 1
                    ].message.substring(0, 30)}...`
                  : chat.messages[chat.messages.length - 1].message}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const Skeleton = () => <div></div>

  return !!chats.length ? <List /> : <Skeleton />
}

export default ChatList
