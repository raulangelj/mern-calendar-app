export const initialState = {
  status: "checking", // checking, not-authenticated, authenticated
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated", // checking, not-authenticated, authenticated
  user: {
    uid: "TEST_ID",
    name: "Test_user",
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: "not-authenticated", // checking, not-authenticated, authenticated
  user: {},
  errorMessage: undefined,
};
