import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import Main from "@/pages/Main";
import MapView from "@/pages/MapView";
import AuthGuard from "./AuthRoute";
import GuestGuard from "./AppRoute";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";

export const AuthContext = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index element={<Main />} />
        <Route path="/mapview" element={<MapView />} />
      </Route>

      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
