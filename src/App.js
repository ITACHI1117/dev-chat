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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Welcome />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/signUp",
//     element: <SignUp />,
//   },
//   {
//     path: "/profile",
//     element: <ProfilePic />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/chats/:id",
//     element: <ChatHome />,
//   },
// ]);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Welcome />} errorElement={<Error />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        loader={({ params }) => {
          return params.id;
        }}
        path="/chats/:id"
        element={<ChatHome />}
      />
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
