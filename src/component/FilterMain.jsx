import CategoryOption from "./CategoryOption";
import Categories from "./svgs/categorySvgs.js";
import Selector from "./Selector";
import Input from "./Input";
import SelectorDisabled from "./svgs/SelectorDisabled";
import { useSelector } from "react-redux";
import SelectorWithInput from "./SelectorWithInput";
import { Link } from "react-router-dom";

const FilterMain = () => {
  const { make } = useSelector((state) => state.filter);
  return (
    <>
      <div className="h-40 w-[978px] bg-white mx-auto mt-[150px] rounded-lg shadow-sm flex">
        <div className="grid w-[88px] grid-rows-4 overflow-hidden">
          <CategoryOption
            icon={Categories.lightVehicle}
            category="light"
            place={1}
          />
          <CategoryOption icon={Categories.bike} category="bike" place={2} />
          <CategoryOption icon={Categories.van} category="van" place={3} />
          <CategoryOption icon={Categories.truck} category="truck" place={4} />
        </div>
        <div className="w-full grid grid-cols-4 grid-rows-2 gap-[18px] p-[18px] pt-3">
          <Selector label={"Make"} type="make" defaultText="Any" />
          {!make ? (
            <SelectorDisabled label={"Model"} defaultText="Any" />
          ) : (
            <Selector label={"Model"} type="model" defaultText="Any" />
          )}
          <SelectorWithInput
            label={"1st registration from"}
            type="year"
            defaultText="Any"
          />
          <SelectorWithInput
            label={"Mileage up to"}
            type="mileage"
            defaultText="Any"
          />
          <div></div>
          <SelectorWithInput
            label={"Price up to"}
            type="price"
            defaultText="Any"
          />
          <Selector label={"City"} type="city" defaultText="Any" />
          <div className="flex flex-col justify-end">
            <Link to="/cars">
              <button className="w-full h-fit px-3 py-2 rounded-[5px] bg-blue-600 text-white font-medium">
                Results
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterMain;
