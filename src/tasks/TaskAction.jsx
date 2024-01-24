import { useContext, useState } from "react";
import { TasksContext } from "../context";
import AllDeleteModal from "./AllDeleteModal";

export default function TaskAction({ onOpenModal }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { state } = useContext(TasksContext);

  const handleModalOpen = () => {
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      {showDeleteModal && (
        <AllDeleteModal handleModalClose={handleModalClose} />
      )}
      <button
        onClick={onOpenModal}
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Add Task
      </button>
      <button
        onClick={handleModalOpen}
        disabled={state.tasks.length === 0}
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Delete All
      </button>
    </>
  );
}
