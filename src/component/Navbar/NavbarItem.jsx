import { Link } from "react-router-dom";

const NavbarItem = ({ title, selected, setSelected, link }) => {
  const clickHandler = () => {
    setSelected(title);
  };
  return (
    <>
      <Link to={link}>
        <div
          className={`px-5 h-full flex items-center cursor-pointer border-r font-medium text-black font-medium ${
            title == selected && "bg-gray-100"
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
