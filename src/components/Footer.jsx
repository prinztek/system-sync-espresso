import {
  FaEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaPhone,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaLocationPin, FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../context/UseAuth";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="footer w-full bg-white mt-9">
      <footer className="max-w-[1240px] mx-auto py-16 px-4 pt-0 grid md:grid-cols-4 grid-cols-1 gap-6 text-black content-around">
        {/* Logo and Socials */}
        <div className="grid grid-cols-2 md:grid-cols-1 md:place-items-start place-items-center">
          <div className="footer-logo">
            <Link to="/">
              <span className="text-sm sm:text-base font-bold text-gray-800 block -mb-2">
                System Sync
              </span>
              <span className="text-3xl font-bold sm:text-2xl text-black block mt-1">
                Espresso
              </span>
            </Link>
          </div>
          <p className="md:block hidden text-sm text-gray-500">
            Your coffee, your moment, perfectly synchronized
          </p>
          <div className="social-links flex justify-between md:w-[50%] my-1">
            <FaFacebookSquare size={30} style={{ cursor: "pointer" }} />
            <FaInstagram size={30} style={{ cursor: "pointer" }} />
            <FaTwitterSquare size={30} style={{ cursor: "pointer" }} />
            <FaXTwitter size={30} style={{ cursor: "pointer" }} />
          </div>
        </div>

        {/* Browse Section */}
        <div>
          <h6 className="font-medium md:border-none border-b pb-1">Browse</h6>
          <ul className="text-gray-500">
            <li className="text-sm pt-4">
              <Link to="/about">About</Link>
            </li>
            <li className="text-sm pt-2">
              <Link to="/menu">Menu</Link>
            </li>
            <li className="text-sm pt-2">
              <Link to="/contact">Contact</Link>
            </li>
            {!user && (
              <>
                <li className="text-sm pt-2">
                  <Link to="/signin">Sign In</Link>
                </li>
                <li className="text-sm pt-2">
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
            {!isAdmin && !user && (
              <li className="text-sm pt-2">
                <Link
                  to="/admin-signin"
                  className="text-amber-600 hover:underline"
                >
                  Admin account?
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h6 className="font-medium md:border-none border-b pb-1">About Us</h6>
          <ul className="text-gray-500">
            <li className="text-sm pt-4">Privacy & Policy</li>
            <li className="text-sm pt-2">Terms & Conditions</li>
            <li className="text-sm pt-2">FAQ</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h6 className="font-medium md:border-none border-b pb-1">
            Contact Information
          </h6>
          <ul className="text-gray-500">
            <li className="text-sm pt-4">
              <span className="flex items-center">
                <FaLocationPin size={15} className="mr-2" />
                Manila, Philippines
              </span>
            </li>
            <li className="text-sm pt-2">
              <span className="flex items-center">
                <FaEnvelope size={15} className="mr-2" />
                ssespresso@gmail.com
              </span>
            </li>
            <li className="text-sm pt-2">
              <span className="flex items-center">
                <FaPhone size={15} className="mr-2" />
                905-123-4567
              </span>
            </li>
          </ul>
        </div>
      </footer>

      {/* Copyright */}
      <p className="text-gray-400 md:text-sm text-center text-xs p-2">
        &copy; {new Date().getFullYear()} System Sync Espresso. All rights
        reserved.
      </p>
    </div>
  );
};

export default Footer;
