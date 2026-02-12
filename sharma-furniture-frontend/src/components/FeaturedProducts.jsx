// src/components/FeaturedProducts.jsx
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const FeaturedProducts = ({ search }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-20">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map(product => (
        <div key={product._id} className="group bg-white rounded-xl shadow p-4">
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/600x400?text=Furniture"}
              alt={product.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition"
            />
          </div>
          <h2 className="mt-4 text-lg font-medium">{product.name}</h2>
          <p className="text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mt-3">
            ₹{product.price.toLocaleString()}
          </p>
          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="mt-4 w-full bg-black text-white py-2 rounded-full hover:opacity-80 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
