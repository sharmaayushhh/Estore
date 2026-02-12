// src/pages/ProductDetails.jsx
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading product...
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 bg-white p-10 rounded-2xl shadow-sm">

        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/600x400?text=Furniture"
            }
            alt={product.name}
            className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          
          {/* Category */}
          {product.category && (
            <span className="text-sm text-[#1e9eff] font-medium mb-2 uppercase tracking-wide">
              {product.category}
            </span>
          )}

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-gray-900 mb-4">
            ₹{product.price?.toLocaleString()}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stock Badge (Optional if you add stock later) */}
          <div className="mb-6">
            <span className="inline-block bg-green-100 text-green-700 text-sm px-4 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-6 py-2">{quantity}</span>

              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart({ ...product, quantity })}
            className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition text-lg"
          >
            Add to Cart
          </button>

          {/* Extra Info Section */}
          <div className="mt-8 text-sm text-gray-500 space-y-2">
            <p>✔ Premium quality materials</p>
            <p>✔ Custom build options available</p>
            <p>✔ Delivery in Bhilai & nearby areas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
