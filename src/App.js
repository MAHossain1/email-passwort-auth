import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginBootstrap from "./components/LoginBootstrap";
import RegisterReactBoots from "./components/RegisterReactBoots";
import Main from "./layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <RegisterReactBoots></RegisterReactBoots>,
      },
      {
        path: "/register",
        element: <RegisterReactBoots></RegisterReactBoots>,
      },
      {
        path: "/login",
        element: <LoginBootstrap></LoginBootstrap>,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
