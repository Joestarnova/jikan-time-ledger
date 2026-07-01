import styles from "./tasks.module.css";
import Modal from "../../../components/ui/modal/Modal";
import { useState, type FormEvent } from "react";
import type { Task } from "../../../types";
import { useTasks } from "../../../context/tasks";

type AddTaskProps = {
  tasks: Task[];
  onAddTasks: (
    task: Pick<Task, "taskName" | "taskEmoji" | "taskColor">,
  ) => void;
};
type ColorPickerProps = {
  selectedColor: string;
  onSelectColor: (color: string) => void;
};

export default function AddTask({ tasks, onAddTasks }: AddTaskProps) {
  const [activeModal, setActiveModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskEmoji, setTaskEmoji] = useState("");
  const [taskColor, setTaskColor] = useState("");
  const {isLoading} = useTasks()

  const handleExit = () => {
    setActiveModal(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskName || !taskEmoji) {
      handleExit();
      return;
    }

    const newTask = {
      taskEmoji,
      taskName,
      taskColor: taskColor || "#F6A724",
    };

    onAddTasks(newTask);
    handleExit();
    setTaskName("");
    setTaskEmoji("");
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
        <p className="text-sm text-zinc-500">
          {isLoading ? "Loading Tasks..." : `${tasks.length === 0 ? "No" : tasks.length} Tasks`}
        </p>
        <button
          onClick={() => setActiveModal(true)}
          className="rounded-md border border-amber-500/60 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-400 transition hover:bg-amber-500/20"
        >
          + Add Task
        </button>
      </div>
      {activeModal && (
        <Modal isOpen={activeModal} onClose={handleExit} title="New Task">
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <p>Name</p>
              <input
                type="text"
                placeholder="e.g. Deep Work"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
              />
              <p>Color</p>
              <ColorPicker
                selectedColor={taskColor}
                onSelectColor={setTaskColor}
              />
              <p>Icon (Optional)</p>
              <input
                type="text"
                placeholder="Paste an emoji"
                value={taskEmoji}
                onChange={(e) => {
                  setTaskEmoji(e.target.value);
                }}
              />
            </div>
            <div className={styles.modalBtn}>
              <button
                type="button"
                className={styles.btn1}
                onClick={handleExit}
              >
                Cancel
              </button>
              <button type="submit" className={styles.btn2}>
                Create Task
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  const colors = [
    "#D03F8A",
    "#3ED06E",
    "#E8614D",
    "#9C7FE9",
    "#5B8DEE",
    "#3ECFB2",
    "#F6A724",
  ];

  return (
    <div className={styles.colorContainer}>
      {colors.map((color) => (
        <div
          key={color}
          className={`${styles.colorChoice} ${selectedColor === color ? styles.colorChoiceSelected : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        ></div>
      ))}
    </div>
  );
}
