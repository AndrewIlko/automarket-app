import { Link } from "react-router-dom";

const NavbarItem = ({ title, selected, setSelected, link }) => {
  const clickHandler = () => {
    setSelected(title);
  };
  return (
    <>
      <Link to={link}>
        <div
          className={`px-5 text-gray-500 h-full flex items-center cursor-pointer font-medium ${
            title == selected ? "text-gray-100" : "hover:text-gray-300"
          }`}
          onClick={clickHandler}
        >
          {title}
        </div>
      </Link>
    </>
  );
};

export default NavbarItem;
