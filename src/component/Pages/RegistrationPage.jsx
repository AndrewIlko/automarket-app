import { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("Ukraine");

  const [banner, setBanner] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = () => {
    if (password1 !== password2) {
      setBanner({ isError: true, message: "Passwords don't match eachother" });
    } else {
      registration();
    }
  };

  const registration = async () => {
    setIsLoading(true);
    const data = {
      email,
      password: password1,
      personalInfo: { name, surname, country },
    };
    try {
      await axios
        .post("http://localhost:5000/registration", { ...data })
        .then((res) => res.data)
        .then((res) => {
          setBanner(res);
          setEmail("");
          setPassword1("");
          setPassword2("");
          setName("");
          setSurname("");
        });
    } catch (e) {
      console.log(e);
      setBanner({ isError: true, message: "Server is down, try again later" });
    }
    setIsLoading(false);
  };
  const inputClass =
    "mt-1 mb-4 w-full px-3 py-1 rounded-md bg-gray-700 outline-none text-white border border-gray-600";

  return (
    <>
      <div className="w-max mx-auto flex flex-col">
        <div className="text-center mb-4 text-xl font-normal">
          <h1>Registration</h1>
        </div>
        {banner.message && (
          <div
            className={`${
              banner.isError
                ? "bg-red-700 border-red-700"
                : "bg-green-700 border-green-700"
            } p-4 w-full rounded-lg bg-opacity-80 text-white border-2 text-center`}
          >
            {banner.message}
          </div>
        )}
        <form
          className="flex flex-col bg-gray-800 rounded-lg p-4 mt-4 border border-gray-600"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <label className="text-white text-sm mb-2">Email</label>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label className="text-white text-sm mb-2">Password</label>
          <input
            type="password"
            className={inputClass}
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            required
          />
          <label className="text-white text-sm mb-2">Re-type password</label>
          <input
            type="password"
            className={inputClass}
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            required
          />
          <div className="flex gap-7">
            <div>
              <label className="text-white text-sm mb-2">Name</label>
              <input
                type="text"
                className={inputClass}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2">Surname</label>
              <input
                type="text"
                className={inputClass}
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <select
            className="bg-gray-700 text-white px-2.5 py-2 rounded-lg border border-gray-600"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            required
          >
            <option>Ukraine</option>
            <option>Poland</option>
            <option>Slovakia</option>
          </select>
          <button
            className={`px-4 py-1 text-sm text-white font-medium bg-blue-700 mt-4 rounded-md ${
              isLoading && "pointer-events-none bg-blue-800"
            }`}
          >
            {!isLoading ? "Register" : "Registering ..."}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
