import ILoginForm from "../interfaces/ILoginForm";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const formHandler = handleSubmit((data) => console.log(data));
  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={formHandler}>
        <label className="flex-1 text-sm font-bold text-gray-600">
          Email
          <input
            type="text"
            className="h-9 w-full rounded border px-2 py-1 font-normal"
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-600">
          Password
          <input
            type="text"
            className="h-9 w-full rounded border px-2 py-1 font-normal"
            {...register("password", {
              required: "This field is required",
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-custom-secondary p-2 text-white transition-colors duration-300 hover:bg-custom-main focus:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default SignInForm;
