import { useContext } from "react";
import { toast } from "react-toastify";
import { TasksContext } from "../context";
import FavouriteTask from "./FavouriteTask";
import NoTaskFound from "./NoTaskFound";
import UnfavouriteTask from "./UnfavouriteTask";

export default function TaskList({ onEditModalOpen }) {
  const { state, dispatch } = useContext(TasksContext);

  //task delete handler
  const handleDeleteTask = (taskId, task) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete ${task.title} task?`
    );
    if (userConfirmed) {
      dispatch({
        type: "DELETE_TASK",
        payload: taskId,
      });
      toast.success(`${task.title} is deleted successfully`);
    }
  };

  //ok
  const handleFavourite = (taskId, task) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: taskId,
    });
    toast.success(
      `${task.title} is successfully ${
        !task.isFavourite ? "Added" : "Removed"
      } to favourite `
    );
  };

  //Random color for tags ok
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      {state.tasks.length > 0 ? (
        <div className="overflow-auto">
          <table className="table-fixed overflow-auto xl:w-full">
            <thead>
              <tr>
                <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]" />
                <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                  {" "}
                  Title
                </th>
                <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                  {" "}
                  Description
                </th>
                <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                  {" "}
                  Tags
                </th>
                <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                  {" "}
                  Priority
                </th>
                <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                  {" "}
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
                >
                  <td>
                    <button onClick={() => handleFavourite(task.id, task)}>
                      {task.isFavourite ? (
                        <FavouriteTask />
                      ) : (
                        <UnfavouriteTask />
                      )}
                    </button>
                  </td>
                  <td>{task.title}</td>
                  <td>
                    <div>{task.description}</div>
                  </td>
                  <td>
                    <ul className="flex justify-center gap-1.5 flex-wrap">
                      {task.tags.map((tag) => (
                        <li key={tag}>
                          <span
                            className="inline-block h-5 whitespace-nowrap rounded-[45px]  px-2.5 text-sm capitalize text-[#F4F5F6]"
                            style={{ backgroundColor: getRandomColor() }}
                          >
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="text-center">{task.priority}</td>
                  <td>
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => handleDeleteTask(task.id, task)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => onEditModalOpen(task)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoTaskFound />
      )}
    </>
  );
}
