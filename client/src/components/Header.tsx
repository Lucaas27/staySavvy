import { Link } from "react-router-dom";
import Hero from "./Hero";
import { useAppContext } from "../hooks/useAppContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-custom-main py-6">
      <nav className="section-container flex justify-between space-x-2">
        <span className="text-3xl font-bold tracking-tight text-custom-content">
          <Link to="/" data-testid="brand">
            StaySavvy
          </Link>
        </span>
        <div className="flex flex-row flex-wrap text-sm">
          {isLoggedIn ? (
            <span className="flex min-w-max gap-2">
              <Link
                to="/my-bookings"
                data-testid="nav-my-bookings-link"
                className="flex items-center rounded-md px-3 font-bold text-white hover:bg-custom-secondary"
              >
                My Bookings
              </Link>

              <Link
                data-testid="nav-my-hotels-link"
                to="/my-hotels"
                className="flex items-center rounded-md px-3 font-bold text-white hover:bg-custom-secondary"
              >
                My Hotels
              </Link>

              <LogoutButton />
            </span>
          ) : (
            <span className="flex min-w-max gap-2">
              <Link
                data-testid="nav-register-link"
                to="/register"
                className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:bg-gray-100"
              >
                Register
              </Link>
              <Link
                data-testid="nav-login-link"
                to="/login"
                className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:bg-gray-100"
              >
                Login
              </Link>
            </span>
          )}
        </div>
      </nav>
      <Hero />
    </header>
  );
};

export default Header;
