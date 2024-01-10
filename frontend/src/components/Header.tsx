import { Link } from "react-router-dom";
import Hero from "./Hero";

const Header = () => {
  return (
    <header className="bg-custom-main py-6">
      <nav className="section-container flex justify-between space-x-2">
        <span className="text-3xl font-bold tracking-tight text-custom-content">
          <Link to="/">StaySavvy</Link>
        </span>
        <span className="flex min-w-max space-x-2">
          <Link
            to="/sign-in"
            className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </nav>
      <Hero />
    </header>
  );
};

export default Header;
