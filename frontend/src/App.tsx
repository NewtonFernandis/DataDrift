import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Sender from "./pages/sender";
import Home from "./pages/home";
import Receiver from "./pages/receiver";
import { ChakraProvider } from "@chakra-ui/react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sender",
    element: <Sender />,
  },
  {
    path: "/receiver/:id",
    element: <Receiver />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
