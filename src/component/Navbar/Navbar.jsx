import { useState } from "react";
import Logo from "../../images/Logo.png";
import NavbarItem from "./NavbarItem";
import Login from "../Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [selected, setSelected] = useState("Home");
  return (
    <>
      <nav className="flex justify-between h-full px-7 text-slate-50">
        <Link to="/" className="cursor-pointer flex items-center gap-3">
          <img className="w-9" src={Logo} alt="Logo" />
          <h1 className="text-2xl text-slate-50 font-medium">AutoMarket</h1>
        </Link>
        <div className="flex gap-2">
          <NavbarItem
            title="Home"
            selected={selected}
            setSelected={setSelected}
            link="/"
          />
        </div>
        <div className="flex gap-4 items-center">
          <button className="px-5 py-2.5 text-sm rounded font-medium bg-slate-600">
            How it works?
          </button>
          <Login />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
