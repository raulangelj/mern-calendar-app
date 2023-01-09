import {
  calendarWithActiveEventState,
  events,
  initialState,
} from "../../../../fixtures/calendarStates";
import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "./calendarSlice";
import { calendarWithEventsState } from "./../../../../fixtures/calendarStates";
describe("Test on calendarSlice", () => {
  test("should return defaul state", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("should activate the event the onsetActiveEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("should add new event onAddNewEvent", () => {
    const newEvent = {
      id: "44",
      start: new Date("2023-01-11 15:00:00"),
      end: new Date("2023-01-11 17:00:00"),
      title: "My event number 44",
      notes: "Some notes for note 44",
    };
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onAddNewEvent(newEvent)
    );
    expect(state.events.length).toBe(events.length + 1);
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("should update the event onUpdateEvent", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2023-01-12 15:00:00"),
      end: new Date("2023-01-12 17:00:00"),
      title: "My event number 1 UPDATED",
      notes: "UPDATED Some notes",
    };

    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onUpdateEvent(updatedEvent)
    );
    expect(state.events).toContain(updatedEvent);
  });

  test("should delete the active event onDeleteEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events.length).toBe(events.length - 1);
    expect(state.events).not.toContain(
      calendarWithActiveEventState.activeEvent
    );
  });

  test("should load the event onLoadEvents", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    // avoid duplicate events
    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(newState.events.length).toBe(events.length)
    expect(newState.events).toEqual(events);
  });

  test("should clean the state onLogoutCalendar", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
