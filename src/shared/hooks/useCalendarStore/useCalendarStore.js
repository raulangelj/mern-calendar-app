import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../../../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO LLEGAR AL BACKEND
    if (calendarEvent._id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
