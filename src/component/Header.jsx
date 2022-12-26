import Navbar from "./Navbar/Navbar";
import Wrapper from "./Wrapper";

const Header = ({ ...props }) => {
  return (
    <>
      <header className="h-14 w-full flex justify-center items-center bg-gray-800">
        <Wrapper>
          <Navbar />
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
