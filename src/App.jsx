import { createBrowserRouter } from "react-router";
import Aboute from "./pages/Aboute";
import Home from "./pages/Home";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:name",
      element: <Aboute />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
