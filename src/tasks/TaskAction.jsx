import { useContext } from "react";
import { toast } from "react-toastify";
import { TasksContext } from "../context";

export default function TaskAction({ onOpenModal }) {
  const { state, dispatch } = useContext(TasksContext);

  //delete all tasks handler
  const handleDeleteAllTask = () => {
    const deleteConfirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );
    if (deleteConfirmed) {
      dispatch({
        type: "DELETE_ALL_TASKS",
      });
      toast.success(`All tasks is deleted successfully`);
    }
  };

  return (
    <>
      <button
        onClick={onOpenModal}
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Add Task
      </button>
      <button
        onClick={handleDeleteAllTask}
        disabled={state.tasks.length === 0}
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Delete All
      </button>
    </>
  );
}
