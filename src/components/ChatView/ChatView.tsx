import React, { useEffect } from "react"
// import { styles } from "./styles"

const styles = {
  chatViewWrapper: {
    padding: "2rem",
    paddingTop: "5rem",
    overflowY: "scroll",
  } as React.CSSProperties,
  allMessagesWrapper: {
    marginBottom: "15px",
    position: "relative",
    whiteWpace: "pre-wrap",
    zoom: 1,
    display: "inline-block",
    width: "100%",
  } as React.CSSProperties,
  singleMessageWrapper: {
    display: "inline-block",
    width: "100%",
  } as React.CSSProperties,
  toolbar: {
    position: "fixed",
    width: "100%",
    zIndex: 9,
    backgroundColor: "#1c1d1f",
    top: "0px",
  } as React.CSSProperties,
  them: {
    float: "left",
    clear: "left",
    backgroundColor: "#3e3f41",
    maxWidth: "70%",
    borderRadius: "1.3em",
    padding: "6px 12px 7px",
    wordWrap: "break-word",
    marginBottom: "3px",
  } as React.CSSProperties,
  me: {
    float: "right",
    clear: "right",
    backgroundColor: "#0098fe",
    maxWidth: "70%",
    borderRadius: "1.3em",
    padding: "6px 12px 7px",
    wordWrap: "break-word",
    marginBottom: "3px",
  } as React.CSSProperties,
}

const ChatView = ({ user, chat }: { user: any; chat: any }) => {
  const chatViewRef = React.useRef<HTMLDivElement>(null)

  const scrollToRef = () =>
    chatViewRef.current?.scrollTo(0, chatViewRef.current?.scrollHeight || 0)

  useEffect(() => {
    scrollToRef()
  }, [])

  return (
    <div ref={chatViewRef} style={styles.chatViewWrapper}>
      <div style={styles.toolbar}>
        <h4>{chat.users.filter((usr: any) => usr !== user)}</h4>
      </div>
      <div style={styles.allMessagesWrapper}>
        {chat.messages.map((msg: any, idx: number) => {
          return (
            <div key={idx} style={styles.singleMessageWrapper}>
              <div style={msg.sender === user ? styles.me : styles.them}>
                {msg.message}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatView
