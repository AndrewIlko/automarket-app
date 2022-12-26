import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = () => {
    setIsSubmited(true);

    setTimeout(() => {
      setEmail("");
      setPassword("");
      setIsSubmited(false);
    }, 5000);
  };
  return (
    <>
      <div className="w-80 mx-auto flex flex-col">
        <div className="text-center mb-4 text-xl font-normal">
          <h1>Sign in to AutoMarket</h1>
        </div>
        <div></div>
        <form
          className="flex flex-col bg-gray-800 rounded-lg p-4 mt-4 border border-gray-600"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
            console.log("Submited");
          }}
        >
          <label className="text-white text-sm mb-2" htmlFor="email">
            Username or email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="mt-1 mb-4 w-full px-3 py-1 rounded-md bg-gray-700 outline-none text-white border border-gray-600"
            required
            onChange={emailHandler}
          />
          <label className="text-white text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="mt-1 mb-4 w-full px-3 py-1 rounded-md bg-gray-700 outline-none text-white border border-gray-600"
            required
            onChange={passwordHandler}
          />
          <button
            className={`px-4 py-1 text-sm ${
              !isSubmited ? "bg-green-700" : "bg-green-800"
            } rounded-md font-medium text-white`}
          >
            {!isSubmited ? "Sign in" : "Signing in ..."}
          </button>
        </form>
        <div className="bg-gray-800 w-full h-14 rounded-lg mt-4 mb-2.5 border border-gray-600 p-4 text-sm text-white text-center">
          New to AutoMarket?{" "}
          <Link className="text-blue-400 hover:underline" to="/registration">
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
