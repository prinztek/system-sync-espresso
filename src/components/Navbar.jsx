import { MenuIcon, XIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { useCart } from "../context/useCart";

const Navbar = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  const handleClose = () => {
    setNav(false);
  };

  return (
    <div className="navbar w-full bg-white fixed top-0 z-10 drop-shadow-lg">
      <nav
        className={
          !nav
            ? "max-w-[1240px] w-full mx-auto h-[90px]  text-black"
            : "max-w-[1240px] w-full mx-auto  h-[90px]  text-black"
        }
      >
        {/* Navigation on large screens */}
        <div className="max-w-[1240px] px-8 flex justify-between items-center w-full h-full">
          <div className="text-center">
            <NavLink to="/">
              <span className="text-sm sm:text-base font-bold text-gray-800 block -mb-2">
                System Sync
              </span>
              <span className="text-3xl font-bold sm:text-2xl text-black block mt-1">
                Espresso
              </span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center justify-center px-6 py-1">
            <ul className="hidden md:flex justify-around items-center">
              <li className="px-6">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? "border-b border-b-amber-600" : ""
                  }
                >
                  Menu
                </NavLink>
              </li>
              <li className="px-6">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "border-b border-b-amber-600" : ""
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="px-6">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "border-b border-b-amber-600" : ""
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li className="px-6">
                {isLoggedIn() ? (
                  <button onClick={logoutUser}>Logout</button>
                ) : (
                  <NavLink to="/signin">Sign In</NavLink>
                )}
              </li>
            </ul>
          </div>
          <Link to={"/cart"}>
            <div className="hidden md:flex justify-around items-center  rounded-lg bg-black border-2 border-white  px-5 py-1">
              <ShoppingCartIcon className="w-6  text-white cursor-pointer" />
              <span className="text-white ml-3">{cartItems?.length}</span>
            </div>
          </Link>
          <div className="md:hidden" onClick={handleClick}>
            {nav ? (
              <XIcon className="w-6 cursor-pointer" />
            ) : (
              <MenuIcon className="w-6 cursor-pointer" />
            )}
          </div>
        </div>

        {/* Navigation on Small Screen */}
        <ul
          className={`${
            nav ? "flex" : "hidden"
          } flex-col items-start bg-white w-full h-screen px-8 py-8 text-lg`}
        >
          <li className="w-full my-4 border-b">
            <NavLink to="/menu" onClick={handleClose}>
              Menu
            </NavLink>
          </li>
          <li className="w-full my-4 border-b">
            <NavLink to="/about" onClick={handleClose}>
              About
            </NavLink>
          </li>
          <li className="w-full my-4 border-b">
            <NavLink to="/contact" onClick={handleClose}>
              Contact
            </NavLink>
          </li>
          <li className="w-full my-4 border-b">
            {isLoggedIn() ? (
              <button onClick={logoutUser} className="text-left">
                Logout
              </button>
            ) : (
              <NavLink to="/signin" onClick={handleClose}>
                Sign In
              </NavLink>
            )}
          </li>
          <li className="w-full my-4 border-b">
            <NavLink to="/cart" onClick={handleClose}>
              <div className="flex items-center space-x-2">
                <ShoppingCartIcon className="w-6" aria-label="Shopping Cart" />
                <span>{cartItems?.length}</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
