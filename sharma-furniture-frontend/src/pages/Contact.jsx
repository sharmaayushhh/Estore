import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting Sharma Furnitures! We will reach you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white text-[#292626]">
      
      {/* Hero Section */}
      <section className="bg-[#4c81b8] text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-100">
          We'd love to hear from you. Get in touch today.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-[#4c81b8]">
            Send Us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-xl shadow-md space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e9eff]"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e9eff]"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e9eff]"
            />

            <button
              type="submit"
              className="w-full bg-[#292626] text-white py-3 rounded-full hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-[#4c81b8]">
            Our Information
          </h2>

          <div className="space-y-4 text-gray-700">
            <p><strong>📍 Address:</strong> Kalyan Nagar Chhawani, Bhilai, Durg, Chhattisgarh 490026</p>
            <p><strong>📞 Phone:</strong> +91 98765 43210</p>
            <p><strong>📧 Email:</strong> support@sharmafurnitures.com</p>
            <p>
              We take custom furniture orders and appointment bookings.
              Feel free to visit us or contact us for personalized furniture solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[450px]">
        <iframe
          title="Sharma Furnitures Location"
          src="https://www.google.com/maps?q=Kalyan%20Nagar%20Chhawani%20Bhilai%20Durg%20Chhattisgarh%20490026&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Bottom CTA */}
      <section className="bg-[#292626] text-white text-center py-10">
        <h3 className="text-xl font-semibold mb-2">
          Ready to build your custom furniture?
        </h3>
        <p className="text-gray-300">
          Book an appointment today and let's design your perfect space.
        </p>
      </section>
    </div>
  );
};

export default Contact;
