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
});
