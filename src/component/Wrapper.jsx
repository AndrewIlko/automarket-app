const Wrapper = ({ children }) => {
  return (
    <>
      <div className="container max-w-7xl flex flex-col flex-1">{children}</div>
    </>
  );
};

export default Wrapper;
