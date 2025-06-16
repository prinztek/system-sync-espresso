import { useEffect, useState } from "react";

function TotalProducts() {
  const [total, setTotal] = useState(null);
  const [totalError, setTotalError] = useState(null);

  useEffect(() => {
    fetchTotalNumberOfProducts();
  }, []);

  const fetchTotalNumberOfProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/php-backend/admin/products_total.php",
        {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTotal(data);
      console.log("Total products:", data);
    } catch (error) {
      console.error("Error fetching total number of products:", error);
      setTotalError("Failed to fetch total number of products.");
    }
  };

  return (
    <div className="rounded-lg shadow-md bg-white border border-gray-200 p-6 flex flex-col items-center justify-center h-64">
      {totalError ? (
        <p className="text-red-600 font-medium text-center">{totalError}</p>
      ) : total !== null ? (
        <>
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Total Products
          </h2>
          <p className="text-5xl font-extrabold text-neutral-950">{total}</p>
        </>
      ) : (
        <p className="text-gray-500 text-sm">Loading total...</p>
      )}
    </div>
  );
}

export default TotalProducts;
