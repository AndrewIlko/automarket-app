import { useState } from "react";

import NavbarItem from "./NavbarItem";
import Login from "../Login";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileIcon from "../ProfileIcon";
import Logo from "../Logo";

const Navbar = () => {
  const [selected, setSelected] = useState("Home");
  const { isToken } = useSelector((state) => state.user);
  return (
    <>
      <nav className="flex justify-between h-full px-7 text-slate-50">
        <div className="flex items-center gap-5">
          <Link to="/" className="cursor-pointer">
            <Logo />
          </Link>
          <div className="text-black font-normal text-sm">
            Ukraine's biggest vehicle marketplace
          </div>
        </div>
        <div className="flex gap-2 border-l">
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
          {!isToken ? <Login /> : <ProfileIcon />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
