import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EquipmentProvider } from "./context/EquipmentContext.tsx";
import "./index.css";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import EquipDetailPage from "./pages/EquipDetailPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "equipmentDetail",
        element: <EquipDetailPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EquipmentProvider>
      <RouterProvider router={router} />
    </EquipmentProvider>
  </StrictMode>
);
