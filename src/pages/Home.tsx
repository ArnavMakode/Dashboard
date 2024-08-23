import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-52 gap-4 bg-slate-100">
      <h1 className="text-3xl max-sm:text-2xl">Welcome to your Dashboard</h1>
      <p className="text-xl text-center">This dashboard allows you to manage categories and widgets.</p>
      <NavLink to="/dashboard" className="bg-gray-200 px-6 py-2 rounded-xl shadow-black hover:bg-gray-300 shadow-md">Go to Dashboard</NavLink>
    </div>
  );
};
export default Home;
