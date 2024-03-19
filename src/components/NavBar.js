import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { MdElderlyWoman } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsFillSunFill } from "react-icons/bs";
import { GiStarFlag } from "react-icons/gi";
import { useTheme } from "../hooks/helper";
import { useAuth } from "../hooks/helper";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { handleLogout } = useAuth();
  return (
    <nav className=" w-6 sm:w-48  min-h-screen bg-secondary border-r z-50 border-gray-300">
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul>
           <li className="mb-8">
            <Link to="/">
              <img src="https://res.cloudinary.com/demjvtd9v/image/upload/v1709388316/user/newPICS_gbq6bs.png" alt="logo" className="h-14 p-2" />
            </Link>
          </li> 
          <li>
            <NavItem to="/" >
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/CompleateTask">
              <BiTask/>
              <span>CompleatedTask</span>
            </NavItem>
          </li>
           <li>
            <NavItem to="/DelayedTask">
              <MdElderlyWoman />
              <span>DelayTask</span>
            </NavItem>
          </li>
           <li>
            <NavItem to="/Toprated">
              <GiStarFlag />
              <span>TopRated</span>
            </NavItem>
          </li>
          
        </ul>
        <div className="flex gap-2 relative ">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-amber-300 ">
            <BsFillSunFill size={26}/>
          </button>
          <span className="dark:text-white text-amber-300" >Mode</span>
        </div>

        <div className="flex flex-col items-start pb-5">
          <span className="font-semibold text-white text-xl">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1"
          >
            <FiLogOut/>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );  
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
