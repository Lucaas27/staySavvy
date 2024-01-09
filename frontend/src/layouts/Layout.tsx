import Header from "../components/Header";
import Hero from "../components/Hero";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
    </div>
  );
};

export default Layout;
