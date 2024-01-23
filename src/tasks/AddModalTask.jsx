import { useState } from "react";

export default function AddModalTask({
  onHandleTask,
  taskToUpdate,
  handleClose,
}) {
  //local state
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavourite: false,
    }
  );
  const [errors, setErrors] = useState({});

  // input validation
  const isFormValid = () => {
    const newErrors = {};
    if (!task.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!task.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!task.tags || !task.tags.length) {
      newErrors.tags = "Tags are required";
    }
    if (!task.priority.trim()) {
      newErrors.priority = "Please select priority";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isAdd] = useState(Object.is(taskToUpdate, null));

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    onHandleTask(task, isAdd);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
    >
      <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {isAdd ? "Add New Task" : "Update Task"}
      </h2>

      <div className="space-y-9 text-white lg:space-y-10">
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="title">Title</label>
          <input
            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            type="text"
            name="title"
            value={task.title}
            id="title"
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            id="description"
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="tags">Tags</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="tags"
              value={task.tags}
              id="tags"
              onChange={handleChange}
            />
            {errors.tags && <p className="text-red-500 mt-1">{errors.tags}</p>}
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
              name="priority"
              value={task.priority}
              id="priority"
              onChange={handleChange}
            >
              <option value>Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 mt-1">{errors.priority}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between lg:mt-20">
        <button
          onClick={handleClose}
          className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
        >
          Close
        </button>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
        >
          {isAdd ? "Create new Task" : "Update Task"}
        </button>
      </div>
    </form>
  );
}
