export const events = [
  {
    id: "1",
    start: new Date("2023-01-09 15:00:00"),
    end: new Date("2023-01-09 17:00:00"),
    title: "My event number 1",
    notes: "Some notes",
  },
  {
    id: "2",
    start: new Date("2023-01-10 15:00:00"),
    end: new Date("2023-01-10 17:00:00"),
    title: "My event number 2",
    notes: "Some notes from event 2",
  },
  {
    id: "3",
    start: new Date("2023-01-09 12:00:00"),
    end: new Date("2023-01-09 14:00:00"),
    title: "My event number 3",
    notes: "Some notes from event 3",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
