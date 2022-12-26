const Wrapper = ({ children }) => {
  return (
    <>
      <div className="container h-full max-w-7xl">{children}</div>
    </>
  );
};

export default Wrapper;
