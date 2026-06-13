import { useState } from "react";

const NewTask = ({ onAddTask, onDeleteTask }) => {
  const [enteredTask, setEnteredTask] = useState("");

  const handleInputChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const handleAddNewTask = () => {
    if (enteredTask.trim() === "") {
      return;
    }
    onAddTask(enteredTask);
    setEnteredTask("");
  };

  return (
    <div className="flex items-center gap-4">
      <input
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleInputChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddNewTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
