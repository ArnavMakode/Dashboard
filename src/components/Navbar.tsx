import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="flex gap-1 max-sm:place-self-start max-sm:gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "font-bold text-sky-700" : "text-gray-400"
        }
      >
        Home <span className="text-gray-400 font-normal">{">"}</span>
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "font-bold text-sky-700" : "text-gray-400"
        }
      >
        {" "}
        Dashboard V2 <span className="text-gray-400 font-normal">{">"}</span>
      </NavLink>
      {location.pathname === "/search" && (
        <span className="font-bold text-sky-700 cursor-default"> Search</span>
      )}
    </nav>
  );
};
export default Navbar;
