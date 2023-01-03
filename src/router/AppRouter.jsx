import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../shared";

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();
  // const authStatus = "not-authenticated"; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, [])

  if (status === "checking") {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}

    </Routes>
  );
};
