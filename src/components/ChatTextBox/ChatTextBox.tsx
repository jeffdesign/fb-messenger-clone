import React, { useState } from "react"
// import { styles } from "./styles"

const styles = {
  input: {
    minWidth: "90%",
    padding: "9px 8px",
    borderRadius: "18px",
    background: "#3e4040",
    border: "none",
    color: "#fff",
    fontSize: "14px",
  },
}

const ChatTextBox = ({ submitMessageFn }: { submitMessageFn: any }) => {
  const [chatText, setChatText] = useState("")

  const messageValid = (text: string) => text && text.replace(/\s/g, "").length

  const userTyping = (event: any) =>
    event.keyCode === 13
      ? submitMessage(event)
      : setChatText(event?.target.value)

  const userClickedInput = () => {
    console.log("clicked input")
  }

  const submitMessage = (event: any) => {
    event.preventDefault()
    if (messageValid(chatText)) {
      submitMessageFn(chatText)
      setChatText("")
    }
  }
  const onHandleChange = (event: any) => {
    setChatText(event?.target.value)
  }

  return (
    <div>
      <input
        onChange={(event) => onHandleChange(event)}
        style={styles.input}
        type="text"
        placeholder="Type a message..."
        onKeyUp={(event) => userTyping(event)}
        onFocus={userClickedInput}
        value={chatText}
      />
      <button onClick={(event) => submitMessage(event)}>Send</button>
    </div>
  )
}

export default ChatTextBox
