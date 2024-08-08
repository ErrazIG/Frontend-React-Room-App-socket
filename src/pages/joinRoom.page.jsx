import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const JoinRoom = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    console.log("Username:", userName);
    console.log("Room ID:", roomId);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/room/join-room",
        {
          userName,
          roomId,
        }
      );

      console.log("Full Response:", response);
      console.log("Response Data:", response.data);

      if (response.data) {
        socket.emit("joinRoom", roomId, userName);
        navigate(`/room/${roomId}`);
      } else {
        console.error("Error joining room:", response.data.message);
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div>
      <h1>Join Room</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
