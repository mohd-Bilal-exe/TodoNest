import SlideInNotifications from "./SlideInNotifications";
import { Palette, Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskColor, deleteTask } from "../Global_state-redux/TaskActions";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import ColorButtons from "./ColorButtons";

const calculateColor = (color, isDarkmode) => {
  if (!isDarkmode) {
    switch (color) {
      case "AzureBreeze":
        return "border-c1";
      case "MeadowMist":
        return "border-c2";
      case "PeachyBlush":
        return "border-c3";
      case "LavenderHaze":
        return "border-c4";
      case "CoralCrush":
        return "border-c5";
      case "MintWhisper":
        return "border-c6";
      default:
        return "border border-black/20";
    }
  } else {
    switch (color) {
      case "AzureBreeze":
        return "border-c1lt";
      case "MeadowMist":
        return "border-c2lt";
      case "PeachyBlush":
        return "border-c3lt";
      case "LavenderHaze":
        return "border-c4lt";
      case "CoralCrush":
        return "border-c5lt";
      case "MintWhisper":
        return "border-c6lt";
      default:
        return "border border-w1/30";
    }
  }
};

const TaskModal = ({ task, setSelectedTask }) => {
  const [palettExpanded, setpalettExpanded] = useState(false);
  const [borderColor, setBorderColor] = useState("");
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    setBorderColor(calculateColor(task.bgCol, isDarkmode));
  }, [task.bgCol, isDarkmode, task]);

  const handleColorChange = (color) => {
    setBorderColor(calculateColor(color, isDarkmode));
    dispatch(changeTaskColor(task.id, color));
    setpalettExpanded(false); // Close palette after color selection
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    setSelectedTask(null);
  };

  if (!task) return null;

  return (
    <section className="fixed inset-0 grid place-content-center bg-black/60 backdrop-blur">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        onClick={() => setSelectedTask(null)}
        className="absolute w-full h-full"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className={`z-50 relative flex flex-col justify-between rounded-md max-w-md w-96 laptop:w-[550px] h-fit laptop:h-[450px] p-2 pt-6 px-6 border ${borderColor} ${
          !isDarkmode ? "bg-white/95 text-bg1" : "bg-bg1/95 text-w1"
        }`}
      ><span>
        <h1 className="text-2xl font-bold mb-2 roboto-condensed tracking-wider">{task.heading}</h1>
        <h2 className="text-xs text-gray-500 mb-4 ml-2 tracking-tight">{`${task.creationTime.datePart} at ${task.creationTime.timePart}`}</h2>
        <div className="overflow-y-auto overflow-x-hidden mb-4 w-full h-52">
          <p className="quicksand tracking-wide">{task.text}</p>
        </div></span>
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center">
            <AnimatePresence>
              {!palettExpanded && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Palette
                    onClick={() => setpalettExpanded(true)}
                    weight="duotone"
                    size={34}
                    className="cursor-pointer text-yellow-800"
                  />
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {palettExpanded && <ColorButtons func={handleColorChange} />}
            </AnimatePresence>
          </div>
          <div className="flex items-center space-x-2">
            <SlideInNotifications
              initialIsCompleted={task.completed}
              taskId={task.id}
              dispatch={dispatch}
            />
            <Trash
              onClick={() => handleDeleteTask(task.id)}
              size={32}
              weight="duotone"
              className="hover:scale-105 transition-all cursor-pointer"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

TaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    bgCol: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    creationTime: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  setSelectedTask: PropTypes.func.isRequired,
};

export default TaskModal;
