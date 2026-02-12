import React from "react";

const About = () => {
  return (
    <div className="bg-white text-[#292626]">
      
      {/* Hero Section */}
      <section className="bg-[#4c81b8] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About Sharma Furnitures
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-100">
          Crafting comfort, building trust, and delivering premium furniture
          since 2015.
        </p>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#4c81b8]">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sharma Furnitures was founded in 2015 by 
            <span className="font-semibold"> Mr. Sanjay Kumar Sharma </span> 
            with a vision to provide high-quality, durable, and beautifully 
            designed furniture to every home.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            What started as a local offline service in Bhilai, Chhattisgarh,
            has grown into a trusted name known for craftsmanship, reliability,
            and customer satisfaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For years, we have proudly served our nearby areas with premium
            furniture solutions — combining modern designs with lasting strength.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1615873968403-89e068629265"
            alt="Furniture showroom"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#4c81b8]">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                🪑 Premium Quality Furniture
              </h3>
              <p className="text-gray-600">
                We deliver durable and elegant furniture crafted with the
                highest quality materials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                🛠 Custom Furniture Orders
              </h3>
              <p className="text-gray-600">
                We take custom furniture orders and appointments to design
                pieces tailored exactly to your needs and space.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                🚚 Local Delivery
              </h3>
              <p className="text-gray-600">
                We proudly serve Bhilai, Chhattisgarh and nearby areas with
                reliable offline support and delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#4c81b8]">
          Our Mission
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Our mission is to combine comfort, elegance, and durability
          into every piece we create. We believe furniture is not just
          about wood and design — it’s about creating a home filled with
          warmth and style.
        </p>
      </section>

      {/* Location Section */}
      <section className="bg-[#292626] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Visit Us
        </h2>
        <p className="text-gray-300 mb-2">
          📍 Bhilai, Chhattisgarh
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We operate both online and offline to ensure our customers receive
          the best service and support.
        </p>
      </section>

      {/* Developer Credit */}
      <section className="text-center py-6 text-sm text-gray-500">
        Website developed by <span className="font-semibold">Webydia</span>
      </section>
    </div>
  );
};

export default About;
