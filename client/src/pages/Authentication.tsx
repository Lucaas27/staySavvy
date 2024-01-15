import authenticationSVG from "../assets/authentication.svg";
import googleSVG from "../assets/google.svg";
import githubSVG from "../assets/github.svg";
import AuthenticationProps from "../interfaces/AuthenticationProps";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const Authentication = ({ isSignIn }: AuthenticationProps) => {
  return (
    <div className="flex flex-col justify-center lg:flex-row lg:space-x-2">
      <div className="hidden max-w-md text-center lg:block">
        <img src={authenticationSVG} alt="People with screens" />
      </div>
      <div className="w-full p-8 lg:w-1/2 lg:rounded-xl lg:bg-gray-100">
        <div className="mx-auto max-w-md">
          <h2 className="mb-6 text-center text-3xl font-bold">
            {isSignIn ? "Login" : "Register"}
          </h2>
          {isSignIn ? (
            <>
              <p className="mb-6 block text-center text-gray-500">
                New to StaySavvy?{" "}
                <span className="font-bold text-custom-secondary">
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </>
          ) : (
            <p className="mb-6 block text-center text-gray-500">
              Join us to discover a world of possibilities!
            </p>
          )}

          <div className="mt-4 flex flex-col items-center justify-between lg:flex-row">
            <div className="mb-2 w-full lg:mb-0 lg:w-1/2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              >
                <div className="w-4 text-center">
                  <img src={googleSVG} alt="Google logo" />
                </div>
                {isSignIn ? "Sign In with Google" : "Sign Up with Google"}
              </button>
            </div>
            <div className="ml-0 w-full lg:ml-2 lg:w-1/2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              >
                <div className="w-4 text-center">
                  <img src={githubSVG} alt="Github logo" />
                </div>
                {isSignIn ? "Sign In with Github" : "Sign Up with Github"}
              </button>
            </div>
          </div>
        </div>
        <small className="my-4 block text-center text-gray-600">
          or with email
        </small>
        {isSignIn ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};

export default Authentication;
