import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
