import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { roomState } from "../atoms/rooms.atom.js";

const socket = io("http://localhost:8080");

const RoomPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useRecoilState(roomState(roomId));

  useEffect(() => {
    // Charger les utilisateurs depuis le localStorage
    const savedRoom = localStorage.getItem(`room-${roomId}`);
    if (savedRoom) {
      setRoom(JSON.parse(savedRoom));
    }

    socket.emit("joinRoom", roomId);

    socket.on("updateRoom", (data) => {
      if (data && data.users) {
        const updatedRoom = { id: roomId, users: data.users };
        setRoom(updatedRoom);
        // Sauvegarder les utilisateurs dans le localStorage
        localStorage.setItem(`room-${roomId}`, JSON.stringify(updatedRoom));
      }
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("updateRoom");
    };
  }, [roomId, setRoom]);
  console.log("LA ROOM MESDAMES ET MESSIEURS : ", room);

  return (
    <div>
      <h1>Room {roomId}</h1>
      <h2>Utilisateurs dans la salle :</h2>
      <ul>
        {Array.isArray(room.users) && room.users.length > 0 ? (
          room.users.map((user, index) => <li key={index}>{user}</li>)
        ) : (
          <li>Aucun utilisateur disponible</li>
        )}
      </ul>
    </div>
  );
};

export default RoomPage;
