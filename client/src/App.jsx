import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const App = () => {
  const [username, setUsename] = useState("")
  const [chatActive, setChatActive] = useState(false)
  return (
    <>
      <div className="w-screen h-screen bg-gray-100">
        {
          chatActive ? (<div>Chat is here</div>) : (
          <div className="w-screen h-screen flex justify-center items-center">
            <input className="text-center px-3 py-2 outline-none border-2 rounded-md" type="text" value={username} placeholder="Nhập username..." />
            <button className="bg-green-500 text-white px-3 py-2 rounded-md font-bold" type="submit">Bắt đầu trò chuyện</button>
          </div>)
        }
      </div>
    </>
  );
};

export default App;
