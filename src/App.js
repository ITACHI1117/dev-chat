import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Error from "./components/Error";
import SignUp from "./pages/SignUp";
import { DataProvider } from "./context/DataContext";
import Login from "./pages/Login";
import ChatHome from "./pages/ChatHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <Error />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chats",
    element: <ChatHome />,
  },
]);

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
