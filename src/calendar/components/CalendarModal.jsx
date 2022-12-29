import Modal from "react-modal";
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds, max } from "date-fns";
import Swall from "sweetalert2";
import { useCalendarStore, useForm, useUIStore } from "../../shared";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const initialFormValues = {
  title: "Raul",
  notes: "Angel",
  start: new Date(),
  end: addHours(new Date(), 2),
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUIStore();
  const { activeEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { title, notes, start, end, formState, onInputChange, setFormState } =
    useForm(initialFormValues);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return title.trim().length > 0 ? "" : "is-invalid";
  }, [formSubmitted, title]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormState({
        ...activeEvent,
      })
    }
  }, [activeEvent])

  const onDateChange = (e, name) => {
    onInputChange({ target: { name, value: e } });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(end, start);
    if (isNaN(difference) || difference <= 0) {
      Swall.fire(
        "Fechas incorrectas",
        "Revisar las fechas ingresadas",
        "error"
      );
      return;
    }
    if (title.trim().length < 2) {
      return;
    }
    // TODO
    // REMOVER ERRORES EN PANTALLA
    // CERRAR MODAL
    console.log(formState);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            minDate={new Date()}
            className="form-control"
            name="start"
            onChange={(e) => onDateChange(e, "start")}
            selected={start}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            className="form-control"
            minDate={max([start, new Date()])}
            name="start"
            onChange={(e) => onDateChange(e, "end")}
            selected={end}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
