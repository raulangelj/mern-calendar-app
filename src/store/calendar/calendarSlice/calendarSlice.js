import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

// const tempEvent = {
//   id: new Date().getTime(),
//   title: "My event",
//   notes: "Some notes",
//   start: new Date(),
//   end: addHours(new Date(), 1),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Raul Angel",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((e) =>
        e.id === payload.id ? payload : e
      );
    },
    onDeleteEvent: (state, { payload }) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((e) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === e.id);
        if (!exist) {
          state.events.push(e);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
