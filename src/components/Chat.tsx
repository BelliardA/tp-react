"use client";
import { useState } from "react";
import useTopic from "usetopic";
import './../style/chat.css'

const MQTT_SERVER = "ws://test.mosquitto.org:8080";
const TOPIC = "crea";

const Chat = () => {
  const { messages, sendMessage } = useTopic(MQTT_SERVER, TOPIC);
  const [value, setValue] = useState("");

  const send = () => {
    sendMessage(value);
    setValue("");
  };

  return (
    <div>
      <div className="message-box">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default Chat;