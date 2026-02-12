// src/pages/Home.jsx
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = ({ search }) => {
  return (
    <>
      <Hero />
      <FeaturedProducts search={search} />
    </>
  );
};

export default Home;
