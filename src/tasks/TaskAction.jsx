export default function TaskAction({ onAddClick, onDeleteAll }) {
  return (
    <>
      <button
        onClick={onAddClick}
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Add Task
      </button>
      <button
        onClick={onDeleteAll}
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Delete All
      </button>
    </>
  );
}
