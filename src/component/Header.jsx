import Navbar from "./Navbar/Navbar";
import Wrapper from "./Wrapper";

const Header = ({ ...props }) => {
  return (
    <>
      <header className="h-[60px] w-full flex justify-center items-center border-b shadow-sm bg-white">
        <Wrapper>
          <Navbar />
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
