import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen page-not-found mt-[96px]">
      <h1>404</h1>
      <h2>Oops! The page you're looking for doesn't exist.</h2>
      <p>The page may have been moved, or it might not exist at all.</p>
      <Link to="/" className="back-home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
