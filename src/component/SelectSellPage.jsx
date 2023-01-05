import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellActions } from "../features/sellReducer";

const SelectSellPage = ({ type }) => {
  const dispatch = useDispatch();
  const { setParam } = sellActions;
  const params = useSelector((state) => state.sell);

  const changeHandler = (e) => {
    console.log(e.target.value);
    dispatch(setParam({ type, param: e.target.value }));
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:5000/select-sell/${"city"}`)
        .then((res) => res.data)
        .then((res) => console.log(res));
    })();
  }, []);

  return (
    <>
      <select
        className="border px-1 rounded text-sm w-28"
        value={params[type]}
        onChange={changeHandler}
        required
      >
        <option value="">Select</option>
        <option>Mercedes</option>
        <option></option>
        <option>Audi</option>
      </select>
    </>
  );
};

export default SelectSellPage;
