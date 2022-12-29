import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, CalendarModal, FabAddNew, NavBar } from "../components";
import { getMessagesES, localizer } from "../../helpers";
import { useCalendarStore, useUIStore } from "../../shared";

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUIStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (e) => {
    openDateModal();
  };

  const onSelect = (e) => {
    setActiveEvent(e)
  };

  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
  };
  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
    </>
  );
};
