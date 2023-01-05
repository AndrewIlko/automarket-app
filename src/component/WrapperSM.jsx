const WrapperSM = ({ children, bg }) => {
  return (
    <>
      <div
        className={`max-w-[998px] w-full mx-auto flex flex-1 flex-col ${
          bg && bg
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default WrapperSM;
