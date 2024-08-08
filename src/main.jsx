import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.jsx";

import { RecoilRoot } from "recoil";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
  // </React.StrictMode>
);
