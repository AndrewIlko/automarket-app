import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex items-center">
        <Link to="/login">
          <button className="px-5 py-2.5 text-sm rounded font-medium bg-blue-700 hover:bg-blue-600">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default Login;
