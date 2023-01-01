import Navbar from "./Navbar/Navbar";
import Wrapper from "./Wrapper";

const Header = ({ ...props }) => {
  return (
    <>
      <header className="h-[60px] w-full flex justify-center border-b shadow-sm bg-white absolute top-0 z-10">
        <Wrapper>
          <Navbar />
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
