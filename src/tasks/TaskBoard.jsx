import { useState } from "react";
import { initialData } from "../data/taskData";
import AddModalTask from "./AddModalTask";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  //handle add task
  const handleTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks((prevTask) =>
        prevTask.map((task) => (task.id === newTask.id ? newTask : task))
      );
    }
    setShowModal(false);
  };

  //handle task close
  const handleClose = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };

  //task edit handler
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  //delete task handler
  const handleDeleteTask = (taskId) => {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  };

  //all delete task handler
  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  //handle search handler
  const handleSearch = (searchTask) => {
    const filtered = initialData.filter((task) =>
      task.title.toLowerCase().includes(searchTask.toLowerCase())
    );
    setTasks(filtered);
  };

  //handle favourite handler
  const handleFavourite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavourite = !newTask[taskIndex].isFavourite;
    setTasks(newTask);
  };

  return (
    <>
      {showModal && (
        <AddModalTask
          onHandleTask={handleTask}
          taskToUpdate={taskToUpdate}
          handleClose={handleClose}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
              <div className="flex items-center space-x-5">
                <SearchTask onSearch={handleSearch} />
                <TaskAction
                  onAddClick={() => setShowModal(true)}
                  onDeleteAll={handleDeleteAllTask}
                />
              </div>
            </div>
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onFavourite={handleFavourite}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
