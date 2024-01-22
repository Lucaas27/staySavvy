import { Link } from "react-router-dom";
import IRegistrationForm from "../interfaces/IRegistrationForm";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";

const RegistrationForm = () => {
  const { signUpMutation, isLoading } = useRegister();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();

  const formHandler = handleSubmit((data) => signUpMutation(data));

  return (
    <>
      <form
        className="flex flex-col gap-5"
        onSubmit={formHandler}
        data-testid="registration-form"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <label
            className="mb-5 h-9 flex-1 text-sm font-bold text-gray-600"
            data-testid="first-name-label"
          >
            First Name
            <input
              data-testid="first-name-input"
              type="text"
              className="w-full rounded border px-2 py-1 font-normal"
              {...register("firstName", {
                required: "This field is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>
          <label
            className="h-9 flex-1 text-sm font-bold text-gray-600"
            data-testid="last-name-label"
          >
            Last Name
            <input
              data-testid="last-name-input"
              type="text"
              className="w-full rounded border px-2 py-1 font-normal"
              {...register("lastName", {
                required: "This field is required",
              })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label
          className="flex-1 text-sm font-bold text-gray-600"
          data-testid="email-label"
        >
          Email
          <input
            data-testid="email-input"
            type="email"
            className="h-9 w-full rounded border px-2 py-1 font-normal"
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label
          className="flex-1 text-sm font-bold text-gray-600"
          data-testid="password-label"
        >
          Password
          <input
            data-testid="password-input"
            type="password"
            className="h-9 w-full rounded border px-2 py-1 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label
          className="flex-1 text-sm font-bold text-gray-600"
          data-testid="confirm-password-label"
        >
          Confirm Password
          <input
            data-testid="confirm-password-input"
            type="password"
            className="h-9 w-full rounded border px-2 py-1 font-normal"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This field is required";
                } else if (watch("password") !== value) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button
          data-testid="register-form-btn"
          disabled={isLoading}
          type="submit"
          className="w-full cursor-pointer rounded-md bg-custom-secondary p-2 text-white transition-colors duration-300 hover:bg-custom-main focus:bg-custom-main focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-gray-600">
        <p className="mb-6 block text-center text-gray-500">
          Already have an account?{" "}
          <span className="font-bold text-custom-secondary">
            <Link to="/login" data-testid="login-form-link">
              Login here
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
