import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-custom-main py-6">
      <div className="container mx-auto flex justify-between lg:px-12">
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
      </div>
    </div>
  );
};

export default Header;
