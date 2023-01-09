import {
  authenticatedState,
  initialState,
} from "../../../../fixtures/authStates";
import { testUserCredentials } from "../../../../fixtures/testUser";
import { authSlice, clearErrorMessage, onLogin, onLogout } from "./authSlice";

describe("Tests on authSlice", () => {
  const errorMessage = "Wrong password or email";

  test("Should return the initial state", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("should do login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("should do logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("should do logout with errormesssage", () => {
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("should clear error message", () => {
    const state = authSlice.reducer({ ...authenticatedState, errorMessage }, clearErrorMessage());
    expect(state.errorMessage).toEqual(undefined)
  });
});
