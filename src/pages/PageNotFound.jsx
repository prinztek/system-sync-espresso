import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="mt-[96px] min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page not found.
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          🔙 Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
