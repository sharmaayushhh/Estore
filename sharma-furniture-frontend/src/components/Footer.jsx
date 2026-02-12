import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // Save emails locally (for now)
    const existing = JSON.parse(localStorage.getItem("subscribers")) || [];
    existing.push(email);
    localStorage.setItem("subscribers", JSON.stringify(existing));

    alert("🎉 Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-[#292626] text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#fffe00] tracking-wide">
            Sharma Furnitures
          </h2>

          <p className="text-sm mt-4 text-gray-300 leading-relaxed">
            Premium furniture crafted with elegance and comfort.
            Custom-built furniture since 2015 in Bhilai, Chhattisgarh.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1e9eff] transition"
            >
              📘
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1e9eff] transition"
            >
              📸
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1e9eff] transition"
            >
              🐦
            </a>
            <a
              href="https://webydia.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1e9eff] transition"
            >
              🌐
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <Link to="/" className="hover:text-[#1e9eff] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#1e9eff] transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#1e9eff] transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-[#1e9eff] transition">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-5">Categories</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <Link to="/category/sofa" className="hover:text-[#1e9eff] transition">
                Sofas
              </Link>
            </li>
            <li>
              <Link to="/category/bed" className="hover:text-[#1e9eff] transition">
                Beds
              </Link>
            </li>
            <li>
              <Link to="/category/table" className="hover:text-[#1e9eff] transition">
                Tables
              </Link>
            </li>
            <li>
              <Link to="/category/wardrobe" className="hover:text-[#1e9eff] transition">
                Wardrobes
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h3 className="font-semibold mb-5">Contact Us</h3>

          <p className="text-gray-300 text-sm">
            📍 Bhilai, Chhattisgarh
          </p>

          <a
            href="mailto:support@sharmafurnitures.com"
            className="block text-gray-300 text-sm mt-2 hover:text-[#1e9eff]"
          >
            📧 support@sharmafurnitures.com
          </a>

          <a
            href="tel:+919876543210"
            className="block text-gray-300 text-sm mt-2 hover:text-[#1e9eff]"
          >
            📞 +91 98765 43210
          </a>

          {/* Newsletter */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Newsletter</h4>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-full text-black focus:outline-none"
              />

              <button
                type="submit"
                className="bg-[#fffe00] text-black font-semibold py-2 rounded-full hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-5 text-sm text-gray-400">
        © {new Date().getFullYear()} Sharma Furnitures. All rights reserved.
        <span className="mx-2">|</span>
        <Link to="/privacy" className="hover:text-[#1e9eff]">
          Privacy Policy
        </Link>
        <span className="mx-2">|</span>
        Developed by{" "}
        <a
          href="https://webydia.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#fffe00] hover:text-[#1e9eff]"
        >
          Webydia
        </a>
      </div>
    </footer>
  );
};

export default Footer;
