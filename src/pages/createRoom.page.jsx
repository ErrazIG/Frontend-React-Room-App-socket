import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://backend-node-js-room-app-socket.vercel.app"); // Remplace par l'URL de ton backend

const CreateRoom = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if (!userName.trim()) {
      setError("Le nom d'utilisateur ne peut pas être vide");
      return;
    }
    try {
      const response = await axios.post(
        "https://backend-node-js-room-app-socket.vercel.app/api/room/create-room",
        { userName }
      );

      const { roomId } = response.data;
      console.log("LA REPONSE : ", response.data);

      socket.emit("createRoom", userName);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Erreur lors de la création de la salle");
    }
  };

  return (
    <div>
      <h1>Create Room</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateRoom;
