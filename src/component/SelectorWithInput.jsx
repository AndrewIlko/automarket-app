import uuid from "react-uuid";
import axios from "axios";
import useResize from "../customHooks/useResize";
import { filterActions } from "../features/filterReducer";
import { URL } from "../functions/restFunc";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectorWithInput = ({ label, type, defaultText }) => {
  const [options, setOptions] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const optionElement = useRef();
  const heightOption = useResize(optionElement);

  const typeValue = useSelector((state) => state.filter)[type];
  const dispatch = useDispatch();
  const state = useSelector((state) => state.filter);
  const { setTypeValue } = filterActions;

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const optionDisplay = (option) => {
    return option || defaultText;
  };

  const filterInput = (text) => {
    return text
      .split("")
      .filter((el) => {
        return el >= 0 && el <= 9 && el != " ";
      })
      .join("");
  };

  const handleChange = (e) => {
    dispatch(setTypeValue({ type, option: filterInput(e.target.value) }));
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(URL(type, state))
        .then((res) => res.data)
        .then((res) => setOptions(["", ...res]));
    })();
  }, []);

  return (
    <>
      <div className="w-full h-full relative">
        <div className="mb-1 text-sm font-medium">{label}</div>
        <div className="w-full h-9 bg-selectorBg rounded-[5px] border transition flex border-spacing-0 hover:shadow cursor-pointer overflow-x-hidden">
          <input
            className="h-full w-5/6 px-[11px] flex items-center text-sm outline-none"
            placeholder={defaultText}
            value={state[type]}
            onChange={handleChange}
          />
          <div
            className="h-full w-1/6 border-l flex justify-center items-center rounded-tl-md rounded-bl-md bg-slate-100"
            onClick={() => {
              toggleIsActive();
            }}
          >
            <i className="material-icons select-none">arrow_drop_down</i>
          </div>
        </div>
        {isActive && (
          <ul
            className={`absolute bg-white w-full border rounded-[5px] mt-[1px] overflow-x-hidden z-10 ${
              options && options.length * heightOption > 320
                ? `overflow-y-scroll h-[${10 * heightOption}]`
                : ""
            }`}
          >
            {!options
              ? "Loading..."
              : options.map((option) => {
                  return (
                    <li
                      key={uuid()}
                      ref={optionElement}
                      className={`px-2 py-1 cursor-pointer text-sm ${
                        option == typeValue
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-100"
                      }`}
                      onClick={() => {
                        dispatch(setTypeValue({ type, option }));
                        toggleIsActive();
                      }}
                    >
                      {optionDisplay(option)}
                    </li>
                  );
                })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SelectorWithInput;
