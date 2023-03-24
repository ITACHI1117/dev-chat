import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Error from "./components/Error";
import SignUp from "./pages/SignUp";
import { DataProvider } from "./context/DataContext";
import Login from "./pages/Login";
import ChatHome from "./pages/ChatHome";
import ProfilePic from "./pages/ProfilePic";
import ChatScreen from "./pages/ChatScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Welcome />} errorElement={<Error />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/profile" element={<ProfilePic />} />
      <Route path="/login" element={<Login />} />
      <Route
        loader={({ params }) => {
          return params.id;
        }}
        path="/chats/:id"
        element={<ChatHome />}
      />
      <Route path="/chatScreen" element={<ChatScreen />} />
    </>
  )
);

function App() {
  return (
    <>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </>
  );
}

export default App;
