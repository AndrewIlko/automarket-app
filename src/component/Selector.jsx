import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useResize from "../customHooks/useResize";
import uuid from "react-uuid";
import { URL } from "../functions/restFunc";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../features/filterReducer";

const Selector = ({ label, type, defaultText }) => {
  const [options, setOptions] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const optionElement = useRef();
  const heightOption = useResize(optionElement);

  const typeValue = useSelector((state) => state.filter)[type];
  const state = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { setTypeValue } = filterActions;

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const optionDisplay = (option) => {
    return option || defaultText;
  };

  useEffect(
    () => {
      (async () => {
        await axios
          .get(URL(type, state))
          .then((res) => res.data)
          .then((res) => setOptions(["", ...res]));
      })();
    },
    type == "model" ? [state.make] : []
  );

  return (
    <>
      <div className="w-full h-full relative">
        <div className="mb-1 text-sm font-medium">{label}</div>
        <div
          className="w-full h-9 bg-selectorBg rounded-[5px] border transition flex border-spacing-0 hover:shadow cursor-pointer overflow-x-hidden"
          onClick={() => {
            toggleIsActive();
          }}
        >
          <div className="h-full w-5/6 px-[11px] flex items-center text-sm">
            {optionDisplay(typeValue)}
          </div>
          <div className="h-full w-1/6 border-l flex justify-center items-center">
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

export default Selector;
