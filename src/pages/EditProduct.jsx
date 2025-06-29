import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const notify = (text, type) => {
    toast[type](text);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost/php-backend/admin/get_product.php?id=${id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...product.sizes];
    updatedSizes[index][field] = value;
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Only allow Food to be available if stock_quantity is provided
    if (
      product.type === "Food" &&
      (product.available === 1 || product.available === true) &&
      (!product.stock_quantity || product.stock_quantity <= 0)
    ) {
      notify(
        "Stock quantity must be greater than 0 if the product is available.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/php-backend/admin/update_product.php",
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        notify("Product updated successfully!", "success");
        navigate("/admin/products");
      } else {
        notify("Failed to update product. Please try again.", "error");
      }
    } catch (err) {
      console.error("Update failed:", err);
      notify("An error occurred while updating the product.", "error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="mt-[90px] max-w-[1240px] mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          name="type"
          value={product.type}
          onChange={handleChange}
          placeholder="Type"
          className="w-full p-2 border rounded"
        />
        <input
          type="checkbox"
          name="available"
          checked={product.available === 1 || product.available === true}
          onChange={(e) =>
            setProduct({ ...product, available: e.target.checked ? 1 : 0 })
          }
        />
        <label className="ml-2" htmlFor="available">
          Available
        </label>
        {product.type === "Food" ? (
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full p-2 border rounded"
          />
        ) : null}
        <input
          name="ingredients"
          value={product.ingredients.join(", ")}
          onChange={(e) =>
            setProduct({
              ...product,
              ingredients: e.target.value.split(",").map((i) => i.trim()),
            })
          }
          placeholder="Ingredients (comma-separated)"
          className="w-full p-2 border rounded"
        />

        {product.sizes.map((size, index) => (
          <div key={size.id} className="flex gap-2 items-center">
            <span className="w-1/3">{size.name}</span>
            <input
              type="number"
              value={size.price}
              onChange={(e) =>
                handleSizeChange(index, "price", parseFloat(e.target.value))
              }
              className="w-2/3 p-1 border rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-3 rounded hover:bg-orange-700 mt-6"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
