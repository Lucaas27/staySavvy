import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-custom-main py-6">
      <nav className="section-container flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-custom-content">
          <Link to="/">Stay Savvy</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </nav>
    </header>
  );
};

export default Header;
