import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ search, setSearch }) => {
  const { cartItems } = useContext(CartContext) || { cartItems: [] };
  const { user, logout } = useContext(AuthContext);

  const totalItems = (cartItems || []).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#292626] tracking-wide"
        >
          Sharma<span className="text-[#4c81b8]">Furnitures</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-10">
          <input
            type="text"
            placeholder="Search premium furniture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e9eff] transition"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-2xl hover:scale-110 transition"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#fffe00] text-black font-semibold rounded-full px-2 py-0.5 text-xs shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-[#292626]">
                Hi, {user.name}
              </span>

              <button
                onClick={logout}
                className="px-4 py-1.5 bg-[#292626] text-white rounded-full hover:bg-[#4c81b8] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-1.5 border border-[#4c81b8] text-[#4c81b8] rounded-full hover:bg-[#4c81b8] hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-1.5 bg-[#4c81b8] text-white rounded-full hover:bg-[#1e9eff] transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
