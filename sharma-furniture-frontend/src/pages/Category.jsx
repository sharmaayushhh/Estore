import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/products?category=${name}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategoryProducts();
  }, [name]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-10 capitalize">
        {name} Collection
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white p-5 rounded-xl shadow">
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300?text=No+Image"
                }
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">
                {product.description}
              </p>
              <p className="font-semibold">
                ₹{product.price?.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
