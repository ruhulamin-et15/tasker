import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "./Page";
import { TasksContext } from "./context";
import { initialState, tasksReducer } from "./reducers/tasksReducer";

export default function App() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <Page />
      <ToastContainer />
    </TasksContext.Provider>
  );
}
