import { useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "../../shared";
import { addHours, differenceInSeconds, max } from "date-fns";
import es from "date-fns/locale/es";
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
  const [isOpen, setIsOpen] = useState(true);
  const { title, notes, start, end, formState, onInputChange } =
    useForm(initialFormValues);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onDateChange = (e, name) => {
    onInputChange({ target: { name, value: e } });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const difference = differenceInSeconds(end, start);
    if (isNaN(difference) || difference <= 0) {
      console.error("Error en las fechas");
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
      isOpen={isOpen}
      onRequestClose={onCloseModal}
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
            className="form-control"
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
