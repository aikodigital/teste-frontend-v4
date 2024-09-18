import { RouteObject } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
];
