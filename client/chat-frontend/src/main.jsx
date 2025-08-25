import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RoomBasedChat from "./pages/RoomBasedChat.jsx";
import SettingsModal from "./pages/SettingsModal.jsx";
import CreateRoomPage from "./pages/CreateRoomPage.jsx";
import { Provider } from "react-redux";
import {store} from "./redux/store.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/room-chat",
        element: <RoomBasedChat />,
      },
      {
        path: "/settings",
        element: <SettingsModal />,
      },
      {
        path: "/create-room",
        element: <CreateRoomPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
