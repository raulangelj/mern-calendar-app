import { useDispatch, useSelector } from "react-redux";
import { calendarAPI } from "../../../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../../../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarAPI.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid, email }));
    } catch (error) {
      // console.log(error);
      dispatch(onLogout("Email or password incorrect"));
      // WE USE THE TIMEOUT TO CLEAR THE ERROR AFTER SOME TIME AND ALLOW THE USER TO TRY AGAIN
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startSignin = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarAPI.post("/auth/signin", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid, email }));
    } catch (error) {
      // console.log(error);
      const { response } = error;
      dispatch(onLogout(response?.data?.msg || "Error on Signin"));
      // WE USE THE TIMEOUT TO CLEAR THE ERROR AFTER SOME TIME AND ALLOW THE USER TO TRY AGAIN
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarAPI.get("/auth/refresh");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // console.log(error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startSignin,
    checkAuthToken,
    startLogout,
  };
};
