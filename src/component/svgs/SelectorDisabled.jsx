const SelectorDisabled = ({ label, defaultText }) => {
  return (
    <>
      <div className="w-full h-full relative">
        <div className="mb-1 text-sm font-medium">{label}</div>
        <div className="w-full h-9 bg-selectorBg rounded-[5px] border transition flex border-spacing-0 cursor-not-allowed border-slate-100 text-slate-300">
          <div className="h-full w-5/6 px-[11px] flex items-center text-sm">
            {defaultText}
          </div>
          <div className="h-full w-1/6 border-l border-slate-100 flex justify-center items-center">
            <i className="material-icons select-none">arrow_drop_down</i>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorDisabled;
