import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const PageNotFound = () => {
  const { isAdmin } = useAuth();
  return (
    <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-amber-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <Link
          to={isAdmin ? "/admin-dashboard" : "/"}
          className="inline-block w-full py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
