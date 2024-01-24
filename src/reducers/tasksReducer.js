import { initialData } from "../data/taskData";

const initialState = {
  tasks: initialData,
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "DELETE_ALL_TASKS":
      return {
        ...state,
        tasks: [],
      };

    case "SEARCH_TASK": {
      const filterTasks = (tasks, searchTerm) => {
        return tasks.filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };
      const filteredTasks = filterTasks(state.tasks, action.payload.trim());

      return {
        ...state,
        searchTask: action.payload,
        tasks: action.payload.trim() === "" ? initialData : filteredTasks,
      };
    }

    case "TOGGLE_FAVOURITE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isFavourite: !task.isFavourite }
            : task
        ),
      };

    default:
      return state;
  }
};

export { initialState, tasksReducer };
