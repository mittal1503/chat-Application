import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, setMessage } from "../redux/feature/userMessageSlice";
import Socket from "../utils/socket";
import { setUserId } from "../redux/feature/userSlice";
import { formateDate } from "../utils/formatedate";
import Navbar from "./navbar";

export const Home = () => {
  const messages = useSelector((state) => state.userMessage.messages);
  const message = useSelector((state) => state.userMessage.message);
  const userId = useSelector((state) => state.user.userId);

  const [senderId, setSenderId] = useState();
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(setUserId(localStorage.getItem("userId")));
    }
    const handleReceivedMessage = (messageData) => {
      console.log(messageData);
      dispatch(setMessages(messageData));
      setSenderId(messageData.senderId);
    };
    Socket.socket.emit("token", localStorage.getItem("token"));
    Socket.socket.on("messsage recieved", handleReceivedMessage);
    return () => {
    Socket.socket.off("messsage recieved", handleReceivedMessage);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      console.log("chatContainerRef.current", chatContainerRef);
        chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(
    userId === senderId,
    "check",
    userId,
    senderId,
    "true right side sender reciever same"
  );
  const onSend = (e) => {

      if (message) Socket.socket.emit("message", message);
      dispatch(setMessage(""));
  };
  return (
    <>
      <Navbar />
      <div className="center-form">
        <div className="chat-box">
          <div
            id="chat-container"
            style={{ overflow: "auto" }}
          >
            {messages.map((msg, i) => (
              <div
                className={`message-bubble ${
                  userId === msg.senderId ? "message-left" : "message-right"
                } `}
                key={i}
              >
                <div className="message-align">
                  {msg.message}

                  <div className="message-timestamp">
                    {formateDate(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatContainerRef} />
          </div>
          <div className="input-container">
            <input
              className="search-input"
              type="text"
              value={message}
              onChange={(e) => dispatch(setMessage(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
            />

            <button className="send-button" onClick={onSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
