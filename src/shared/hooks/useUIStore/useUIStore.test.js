import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUIStore } from "./useUIStore";
import { uiSlice } from "./../../../store/ui/uiSlice/uiSlice";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Tests on useUIStore", () => {
  test("should return the initial state", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test("should change the value of isDateModalOpen when openDateModal triggers", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { openDateModal } = result.current;
    act(() => {
      openDateModal();
    });
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
  test("should change the value of isDateModalOpen when closeDateModal triggers", () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { closeDateModal } = result.current;
    act(() => {
      closeDateModal();
    });
    expect(result.current.isDateModalOpen).toBeFalsy();
  });
  test("should change the value of isDateModalOpen when toggleDateModal triggers", () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { toggleDateModal } = result.current;
    act(() => {
      toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeFalsy();
    const { toggleDateModal: toggleDateModal2 } = result.current;
    act(() => {
      toggleDateModal2();
    });
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
