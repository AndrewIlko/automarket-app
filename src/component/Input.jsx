const Input = ({ label }) => {
  return (
    <>
      <div className="w-full h-full relative">
        <div className="mb-1 text-sm">{label}</div>
        <input
          type="text"
          className="w-full h-9 bg-selectorBg rounded-[5px] border transition flex border-spacing-0 hover:shadow cursor-pointer"
        />
      </div>
    </>
  );
};

export default Input;
