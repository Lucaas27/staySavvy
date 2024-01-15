import { Link } from "react-router-dom";
import Hero from "./Hero";

const Header = () => {
  return (
    <header className="bg-custom-main py-6">
      <nav className="section-container flex justify-between space-x-2">
        <span className="text-3xl font-bold tracking-tight text-custom-content">
          <Link to="/">StaySavvy</Link>
        </span>
        <div className="flex flex-row flex-wrap gap-2 space-x-2 text-sm">
          <span className="flex min-w-max">
            <Link
              to="/register"
              className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:bg-gray-100"
            >
              Register
            </Link>
          </span>
          <span className="flex min-w-max">
            <Link
              to="/login"
              className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:bg-gray-100"
            >
              Login
            </Link>
          </span>
        </div>
      </nav>
      <Hero />
    </header>
  );
};

export default Header;
