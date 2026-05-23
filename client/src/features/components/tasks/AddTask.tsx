import styles from "./tasks.module.css";
import Modal from "../../../components/ui/modal/Modal";
import { useState, type FormEvent } from "react";

type Task = { taskEmoji: string; taskName: string; id: string };
type AddTaskProps = {
  tasks: Task[];
  onAddTasks: (task: Task) => void;
};

export default function AddTask({ tasks, onAddTasks }: AddTaskProps) {
  const [activeModal, setActiveModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskEmoji, setTaskEmoji] = useState("");

  const handleExit = () => {
    setActiveModal(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskName || !taskEmoji) {
      handleExit()
      return
    };

    const newTask = { taskEmoji, taskName, id: crypto.randomUUID() };

    onAddTasks(newTask);

    handleExit();

    setTaskName("");

    setTaskEmoji("");
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <p>{tasks.length === 0 ? "No" : tasks.length} Tasks</p>
        <button onClick={() => setActiveModal(true)}>+ Add Task</button>
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
