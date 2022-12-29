import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../shared";

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const onclickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Raul Angel",
      },
    });
    openDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={onclickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
