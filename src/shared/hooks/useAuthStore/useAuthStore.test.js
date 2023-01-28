import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice } from "../../../store";
import { useAuthStore } from "./useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import {
  initialState,
  notAuthenticatedState,
} from "../../../../fixtures/authStates";
import { testUserCredentials } from "../../../../fixtures/testUser";
import { calendarAPI } from "../../../api";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Tests on useAuthStore", () => {
  beforeEach(() => localStorage.clear());
  test("Should return the default values", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startSignin: expect.any(Function),
    });
  });

  test("should do login succesfull when stratLogin in trigger", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { startLogin } = result.current;
    await act(async () => {
      await startLogin(testUserCredentials);
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid,
        email: testUserCredentials.email,
      },
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("should fail the startlogin", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { startLogin } = result.current;
    await act(async () => {
      await startLogin({
        email: "notvalidemail@google.com",
        password: "123456",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem("token")).toBeNull();
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Email or password incorrect",
      status: "not-authenticated",
      user: {},
    });

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("should do a succesfull startSignin", async () => {
    const newUser = {
      email: "algo@google.com",
      password: "123456",
      name: "Test User 2",
    };
    const returnMockData = {
      ok: true,
      uid: "1263781293",
      name: "Test User 2",
      token: "ALGUN-TOKEN",
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarAPI, "post").mockReturnValue({
      data: returnMockData,
    });

    const { startSignin } = result.current;

    await act(async () => {
      await startSignin(newUser);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: returnMockData.name,
        uid: returnMockData.uid,
        email: newUser.email,
      },
    });

    spy.mockRestore();
  });

  test("should fail on startSignin", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startSignin } = result.current;

    await act(async () => {
      await startSignin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "User already exists with that email",
      status: "not-authenticated",
      user: {},
    });
  });

  test("should fail checkAuthToken if there is no token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken should refresh the token if the is a toekn", async () => {
    const { data } = await calendarAPI.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: testUserCredentials.name, uid: testUserCredentials.uid },
    });
  });
});
