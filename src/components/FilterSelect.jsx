import { useDispatch, useSelector } from "react-redux";
import { FilterTask, ViewState } from "../Global_state-redux/TaskActions"; // Import viewState action creator
import { useState } from "react";
import { ListBullets, SquaresFour } from "@phosphor-icons/react";

const FilterSelect = () => {
  // Components that filter Tasks
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);
  const isDarkmode = useSelector(state => state.tasks.darkMode);
  const [viewState, setViewState] = useState(
    useSelector((state) => state.tasks.viewState)
  ); 
  const handleFilter = (filter) => {
    dispatch(FilterTask(filter));
  };

  const handleViewState = (view) => {
    dispatch(ViewState(view));
    setViewState(view);
  };

  return (
    <section className="h-12 px-5 w-screen flex items-center justify-between">
      <select
        className={`h-fit w-fit py-2 text-sm tracking-tighter nunito rounded-lg focus:outline-none uppercase pr-3 pl-1 ${isDarkmode?"text-bg1":"text-black bg-black/10"} transition-all ease-out duration-700`}
        value={currentFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>
      <span className="h-full flex gap-2 mr-3">
        <button value="GRID" onClick={() => handleViewState("GRID")} className={` hover:scale-110 transition-all ease-out duration-700`}>
        <SquaresFour size={33} weight={`${viewState==="GRID"?"fill":"light"}`} />
        </button>
        <button value="LIST" onClick={() => handleViewState("LIST")} className={` hover:scale-110 transition-all ease-out duration-700`}>
        <ListBullets size={33} weight={`${viewState==="LIST"?"fill":"light"}`} />
        </button>
      </span>
    </section>
  );
};
export default FilterSelect;
