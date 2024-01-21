import { useLogout } from "../hooks/useLogout";

const LogoutButton = () => {
  const { logoutMutation, isLoading } = useLogout();

  const handleClick = () => logoutMutation();
  return (
    <button
      onClick={() => handleClick()}
      disabled={isLoading}
      className="flex items-center rounded-md bg-white px-3 font-bold text-custom-secondary hover:cursor-pointer hover:bg-gray-100"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
