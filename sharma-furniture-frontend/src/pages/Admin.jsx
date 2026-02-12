// src/pages/Admin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",   // ✅ added
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= Protect Admin Route ================= */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      alert("Access Denied. Admin Only.");
      navigate("/");
    }
  }, [user, navigate]);

  /* ================= Fetch Products ================= */
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= Handle Change ================= */
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= Add Product ================= */
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            ...productData,
            price: Number(productData.price),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error || data.message || "Failed to add product");

      alert(`Product "${data.name}" added successfully!`);

      setProductData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",  // ✅ reset
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setLoading(false);
  };

  /* ================= Delete Product ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!res.ok)
        throw new Error("Failed to delete product");

      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-10 text-center">
          Admin Dashboard
        </h1>

        {/* Add Product */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto space-y-5 mb-16"
        >
          <h2 className="text-xl font-semibold text-center">
            Add New Product
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* ✅ NEW CATEGORY FIELD */}
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="sofa">Sofa</option>
            <option value="table">Table</option>
            <option value="bed">Bed</option>
            <option value="wardrobe">Wardrobe</option>
            <option value="chair">Chair</option>
            <option value="chair">Dining</option>
            <option value="chair">Desk</option>
            <option value="chair">Cabinets</option>
            
          </select>

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productData.image}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full hover:opacity-80 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-5 rounded-xl shadow-sm"
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-lg mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-400 text-sm mb-1">
                  Category: {product.category}
                </p>

                <p className="text-gray-500 text-sm mb-2">
                  {product.description}
                </p>

                <p className="font-semibold mb-4">
                  ₹{product.price?.toLocaleString()}
                </p>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
