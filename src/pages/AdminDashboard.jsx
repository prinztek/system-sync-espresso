import { useEffect, useState } from "react";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  const [totalError, setTotalError] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      // Redirect to signin or show an error if the user is not an admin
      navigate("/");
    } else {
      fetchTotalNumberOfProducts();
    }
  }, []);

  const fetchTotalNumberOfProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/php-backend/admin/products_total.php",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotal(data); // Assuming the response contains a 'total' field
      console.log(data); // Handle the total number of products as needed
    } catch (error) {
      console.error("Error fetching total number of products:", error);
      setTotalError("Failed to fetch total number of products.");
    }
  };

  if (!user || !isAdmin) {
    return <div>Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="min-h-screen mt-[90px] mx-auto py-16 px-4">
      <div className="max-w-[1240px] flex flex-col px-6">
        <h1>Admin Dashboard</h1>
        {/* ProductTotalCard Separate Component */}
        <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl border border-gray-200">
          <div className="p-6 flex flex-col items-center justify-center h-64">
            {totalError ? (
              <p className="text-red-600 font-medium text-center">
                {totalError}
              </p>
            ) : total !== null ? (
              <>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  Total Products
                </h2>
                <p className="text-5xl font-extrabold text-neutral-950">
                  {total}
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">Loading total...</p>
            )}
          </div>
        </div>
        <p>
          Welcome to the admin dashboard. Here you can manage users, view
          reports, and configure settings.
        </p>
        {/* Add more admin functionalities here */}
      </div>
    </div>
  );
}
export default AdminDashboard;
