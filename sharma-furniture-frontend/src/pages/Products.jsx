import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent Link navigation
    addToCart(product);
    alert(`${product.name} added to cart 🛒`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading furniture...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 py-16">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-14">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          Furniture Collection
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Designed for comfort. Crafted for modern living.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group cursor-pointer block"
          >
            {/* Image */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/600x400?text=Furniture"
                }
                alt={product.name}
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="mt-5">
              <h2 className="text-lg font-medium text-gray-900">
                {product.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>

              <p className="text-xl font-semibold text-gray-900 mt-3">
                ₹{product.price?.toLocaleString()}
              </p>

              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-4 text-sm border border-gray-900 px-5 py-2 rounded-full hover:bg-gray-900 hover:text-white transition"
              >
                Add to cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
