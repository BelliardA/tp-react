import { useState } from "react"; import useTopic from "usetopic";

const MQTT_SERVER = "mqtt://test.mosquitto.org:8080";
const TOPIC = "crea";


const Chat = () => {
    const { messages, sendMessage } = useTopic(MQTT_SERVER, TOPIC);
    const [value, setValue] = useState("");
    const send = () => { sendMessage(value); setValue(""); };
    return (
        <div>
            <h1>Chat</h1>
            {messages.map((message, index) => (
            <div key={index}>{message}</div>
            ))}
            <input value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={send}>Send</button>
        </div>
     );
};

export default Chat;