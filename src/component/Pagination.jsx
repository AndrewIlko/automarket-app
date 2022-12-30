import uuid from "react-uuid";

const Pagination = ({ number, setPage, page }) => {
  const buttons = [];
  for (let i = 1; i <= number; i++) buttons.push(i);
  return (
    <>
      <ul className="flex gap-[10px]">
        {buttons.map((button) => {
          return (
            <li
              key={uuid()}
              className={`w-10 h-10 flex items-center justify-center rounded-md bg-slate-100 border cursor-pointer ${
                page == button && "bg-slate-200"
              }`}
              onClick={() => {
                setPage(button);
              }}
            >
              {button}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Pagination;
