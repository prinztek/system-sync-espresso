import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "Food",
    ingredients: "",
    available: true,
    image: null,
    stock_quantity: 0,
    sizes: [],
  });

  const [sizeMode, setSizeMode] = useState("standard");

  const sizeOptions = {
    Food: [{ id: 6, name: "One size" }],
    DrinkStandard: [
      { id: 3, name: "Small" },
      { id: 4, name: "Medium" },
      { id: 5, name: "Large" },
    ],
    DrinkShot: [
      { id: 1, name: "Single Shot" },
      { id: 2, name: "Double Shot" },
    ],
  };

  useEffect(() => {
    let sizes = [];

    if (form.type === "Food") {
      sizes = sizeOptions.Food;
    } else if (form.type === "Drink") {
      sizes =
        sizeMode === "standard"
          ? sizeOptions.DrinkStandard
          : sizeOptions.DrinkShot;
    }

    setForm((prev) => ({
      ...prev,
      sizes: sizes.map((size) => ({ ...size, price: "" })),
    }));
  }, [form.type, sizeMode]);

  const handleSizePriceChange = (index, price) => {
    const updated = [...form.sizes];
    updated[index].price = price;
    setForm((prev) => ({ ...prev, sizes: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("type", form.type);
    formData.append("ingredients", form.ingredients);
    formData.append("available", form.available ? "1" : "0");
    formData.append("stock_quantity", "0"); // unused

    // Image
    if (form.image) {
      formData.append("image", form.image);
    }

    // JSON string Sizes
    formData.append("sizes", JSON.stringify(form.sizes));
    console.log(formData);

    try {
      const response = await fetch(
        "http://localhost/php-backend/add_product.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/admin/products");
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error("Error uploading product:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto min-h-screen px-4 py-16">
        <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded p-3 w-full"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border rounded p-3 w-full"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border rounded p-3 w-full"
            >
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
            </select>

            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
              className="border rounded p-3 w-full"
            />
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="border rounded p-3 w-full"
              required
            />

            {/* <input
              type="number"
              placeholder="Stock Quantity"
              value={form.stock_quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_quantity: parseInt(e.target.value) || 0,
                })
              }
              className="border rounded p-3 w-full"
            /> */}
          </div>

          {/* Toggle only if Drink */}
          {form.type === "Drink" && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Select Drink Mode:
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sizeMode"
                    value="standard"
                    checked={sizeMode === "standard"}
                    onChange={() => setSizeMode("standard")}
                  />
                  Standard (S / M / L)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sizeMode"
                    value="shot"
                    checked={sizeMode === "shot"}
                    onChange={() => setSizeMode("shot")}
                  />
                  Shot-based (Single / Double)
                </label>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-medium mb-2">Sizes & Prices</h4>
            <div className="space-y-2">
              {form.sizes.map((size, index) => (
                <div key={size.id} className="flex items-center gap-3 max-w-md">
                  <span className="w-[140px] font-medium">{size.name}</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={size.price}
                    onChange={(e) =>
                      handleSizePriceChange(index, e.target.value)
                    }
                    className="border rounded p-2 flex-1"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-amber-600 text-white px-6 py-3 rounded hover:bg-orange-700 mt-6"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
