import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../../../store";

export const useUIStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = () => {
    if (isDateModalOpen) {
      closeDateModal();
    } else {
      openDateModal();
    }
  };

  return {
    // * properties
    isDateModalOpen,
    // * methods
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
