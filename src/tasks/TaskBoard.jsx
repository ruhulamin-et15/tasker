import { useState } from "react";
import AddModalTask from "./AddModalTask";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  //task modal close
  const handleModalClose = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };

  //task modal open for add task
  const handleAddModalOpen = () => {
    setShowModal(true);
  };

  //task madal open for edit task
  const handleEditModalOpen = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <AddModalTask
          onTaskToUpdate={taskToUpdate}
          onModalClose={handleModalClose}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
              <div className="flex items-center space-x-5">
                <SearchTask />
                <TaskAction onOpenModal={handleAddModalOpen} />
              </div>
            </div>
            <TaskList onEditModalOpen={handleEditModalOpen} />
          </div>
        </div>
      </section>
    </>
  );
}
