import { useCalendarStore } from "../../shared";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const onClickDelete = () => {
    startDeletingEvent();
  };
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={onClickDelete}
      style={{ display: hasEventSelected ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
