import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // search term  (name, type, description)
  const [sortDirection, setSortDirection] = useState("asc"); // sort by name

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/php-backend/admin_products.php",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        setProducts(data);
        console.log("Fetched products:", data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      "http://localhost/php-backend/delete_product.php",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const result = await response.json();
    if (result.success) {
      alert("Product deleted");
      // Refresh the list or remove from local state
    } else {
      alert("Delete failed: " + result.error);
    }
  };

  const handleSortByName = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredAndSortedProducts = [...products]
    .filter((product) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.type.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="mt-[90px] max-w-[1240px] mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Product List</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          />
          <Link
            to="/admin/products/add"
            className="bg-amber-600 text-white rounded px-4 py-2 hover:bg-amber-700 text-sm"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Image</th>
            <th
              className="border p-2 cursor-pointer"
              onClick={handleSortByName}
              title="Click to sort by name"
            >
              Name {sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Ingredients</th>
            <th className="border p-2">Sizes / Prices</th>
            <th className="border p-2">Available</th>
            <th className="border p-2">Stock Quantity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.type}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">{product.ingredients.join(", ")}</td>
              <td className="border p-2">
                {product.sizes.map((size) => (
                  <div key={size.id}>
                    {size.name} - ₱{size.price}
                  </div>
                ))}
              </td>
              <td className="border p-2">{product.available ? "✅" : "❌"}</td>
              <td className="border p-2">
                {product.type === "Food" ? product.stock_quantity : "N/A"}
              </td>
              <td className="border p-2 flex flex-col items-center justify-center space-y-1">
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
