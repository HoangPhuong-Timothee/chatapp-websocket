import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const App = () => {
  const [username, setUsename] = useState("")
  const [chatActive, setChatActive] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(()=>{
    socket.on("received-message", (message)=>{
      setMessages([...messages, message])
    })
  },[messages, socket])

  const handleSendMessage = (e)=>{
    e.preventDefault()

    const messageData = {
      message: newMessage,
      user: username,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }

    !newMessage == "" ? socket.emit("send-message", messageData) : alert("Message can not be empty!")
    setNewMessage("")
  }
  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
        {chatActive ? (
          <div className="p-2 rounded-md w-full md:w-[80vw] lg:w-[40vw] mx-auto">
            <h1 className="text-center font-bold text-xl my-2 uppercase">Chào mừng <span className="text-pink-900">{username}</span> tới phòng trò chuyện!</h1>
            <div>
              <div className="overflow-scroll h-[80vh] lg:h-[60vh]">
                {
                  messages.map((message, index)=>{
                    return (
                      <div key={index} className={`flex rounded-md shadow-md my-5 w-fit ${username === message.user && "ml-auto"}`}>
                        <div className={`bg-green-400 flex justify-center item-center rounded-l-md ${username === message.user && "bg-red-400"}`}>
                          <h3 className="font-bold text-lg px-2">{message.user.charAt(0).toUpperCase()}</h3>
                        </div>
                        <div className="px-2 bg-white rounded-md">
                          <span className="text-sm">{message.user}</span>
                          <h3 className="font-bold">{message.message}</h3>
                          <h3 className="text-xs text-right">{message.time}</h3>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <form className="flex gap-2 md:gap-4 justify-between" onSubmit={handleSendMessage}>
                <input 
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  className="rounded-md border-2 outline-none px-3 py-2 w-full"
                  onChange={e=>setNewMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-green-500 text-white rounded-md font-bold px-3 py-2"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-center gap-2">
            <input 
              className="text-center px-3 py-2 outline-none border-2 rounded-md" 
              type="text" 
              value={username} 
              onChange={e=>setUsename(e.target.value)}
              placeholder="Nhập username..." 
            />
            <button 
              className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
              type="submit"
              onClick={()=> !username=="" && setChatActive(true)}
              >
                Bắt đầu trò chuyện
              </button>
          </div>)
        }
      </div>
    </>
  );
};

export default App;
