import React from "react"

const newChat = () => {
  console.log("new chat click")
}

// const selectChat = (idx: number) => {
//   console.log("selected chat" + idx)
// }

// interface Chats {
//   chat: Chat[]
// }

interface Message {
  message: string
  sender: string
}

interface Chat {
  messages: Message[]
  receiverHasRead: boolean
  users: string[]
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
  chats: any
  selectedChatIndex: any
}) => {
  const List = () => (
    <div>
      <button onClick={() => newChat}>New chat</button>
      <ul>
        {chats.map((chat: any, idx: number) => {
          return (
            <li onClick={() => selectChat(idx)} key={idx}>
              <span>
                {chat.users.filter((user: any) => user !== userEmail)[0]}
              </span>
              <span>: </span>
              <span>
                {chat.messages[chat.messages.length - 1].message.substring(
                  0,
                  30,
                )}
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
