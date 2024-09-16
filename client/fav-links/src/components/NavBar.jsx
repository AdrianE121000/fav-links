import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="bg-neutral-800 text-white font-bold text-lg p-4 flex items-center justify-between">
        <div className="md:ml-10 font-bold hover:text-gray-950 hover:scale-105 transition duration-500 ease-in-out">
          <NavLink to="/">Fav Links</NavLink>
        </div>
        <div className="flex gap-5">
          <NavLink
            className="font-bold px-2 hover:text-gray-950 hover:scale-105 transition duration-500 ease-in-out"
            to="/signin"
          >
            Login
          </NavLink>
          <NavLink
            className="font-bold hover:text-gray-950 hover:scale-105 transition duration-500 ease-in-out"
            to="/signup"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
