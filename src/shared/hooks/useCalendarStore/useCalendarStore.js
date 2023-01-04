import { useDispatch, useSelector } from "react-redux";
import { calendarAPI } from "../../../api";
import { convertEventsToDateEvents } from "../../../helpers";
import Swal from 'sweetalert2';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../store";

export const useCalendarStore = () => {
  const { user } = useSelector((state) => state.auth);
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // UPDATE
        await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // CREATE
      const { data } = await calendarAPI.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      // console.log(error);
      Swal.fire("Error on saving event", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPI.get("/events");
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      // console.log(error);
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarAPI.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error on deleting event", error.response.data.msg, "error");
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
