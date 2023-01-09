import { onCloseDateModal, onOpenDateModal, uiSlice } from "./uiSlice";

describe("Tests ons uiSlice", () => {
  test("should return the state by default", () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("should change the isModalOpen successfully", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
