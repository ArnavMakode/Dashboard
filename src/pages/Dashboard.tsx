import { BsClockFill, BsThreeDotsVertical } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { SlRefresh } from "react-icons/sl";
import { useAppContext } from "../context/AppContext";
import DashboardList from "../components/DashboardList";
import FilterWidgets from "../components/FilterWidgets";
import { useState } from "react";

const Dashboard = () => {
  const { categories } = useAppContext();
  const [filter, setFilter] = useState<boolean>(false);
  const showFilter = () => setFilter((prev) => !prev);
  return (
    <div>
      {filter && <FilterWidgets showFilter={showFilter} />}
      <div className="sm:flex sm:justify-between">
        <span className="text-xl font-bold">CNAPP Dashboard</span>
        <div className="flex gap-3 text-gray-700">
          <button
            className="bg-white px-2 py-1 rounded-md border-2 border-gray-300 max-sm:text-xs"
            onClick={showFilter}
          >
            Add widget <GrAdd className="inline ml-1 align-middle mb-1" />
          </button>
          <button className="bg-white px-2 py-1 rounded-md border-2 border-gray-300">
            <SlRefresh />
          </button>
          <button className="bg-white px-2 py-1 rounded-md border-2 border-gray-300">
            <BsThreeDotsVertical />
          </button>
          <div className="flex items-center bg-white text-indigo-900 font-bold px-2 rounded-md py-1 gap-1 border-gray-300 border-2">
            <BsClockFill />
            <select className="outline-none border-l border-l-indigo-900 text-center h-full text-xs">
              <option value="2D">Last 2 days</option>
              <option value="1W">Last 1 week</option>
              <option value="1M">Last 1 month</option>
              <option value="3M">Last 3 months</option>
            </select>
          </div>
        </div>
      </div>
      <DashboardList selectedWidgets={categories} />
    </div>
  );
};
export default Dashboard;
