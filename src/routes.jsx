import App from "./App.jsx";
import CreateRoom from "./pages/createRoom.page.jsx";
import NotFoundPage from "./pages/errors/not-found.page.jsx";
import HomePage from "./pages/home.page.jsx";
import JoinRoom from "./pages/joinRoom.page.jsx";
import RoomPage from "./pages/room.page.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "create",
        element: <CreateRoom />,
      },
      {
        path: "join",
        element: <JoinRoom />,
      },
      {
        path: "room/:roomId",
        element: <RoomPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
