import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "My event",
  notes: "Some notes",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Raul Angel",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
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
        e._id === payload._id ? payload : e
      );
    },
    onDeleteEvent: (state, { payload }) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
