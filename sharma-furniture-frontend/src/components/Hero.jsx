const Hero = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 items-center gap-12">
        
        <div>
          <h2 className="text-5xl font-semibold leading-tight text-gray-900">
            Modern furniture for modern living.
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Discover comfort, elegance and craftsmanship — designed to
            transform your space beautifully.
          </p>

          <button className="mt-8 bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition">
            Explore Collection
          </button>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1615873968403-89e068629265"
            alt="Furniture"
            className="rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
