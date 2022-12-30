import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../features/filterReducer";

const CategoryOption = ({ icon, category, place }) => {
  const dispatch = useDispatch();
  const { setCategory } = filterActions;
  const selectedCategory = useSelector((state) => state.filter.category);
  return (
    <>
      <div
        className={`flex items-center justify-center cursor-pointer ${
          selectedCategory == category
            ? "bg-white "
            : place == 1
            ? "bg-gray-100 border-r"
            : "bg-gray-100 border-t border-r"
        }`}
        onClick={() => {
          dispatch(setCategory(category));
        }}
      >
        <div
          className={
            category == selectedCategory ? "text-blue-600" : "opacity-50"
          }
        >
          {icon}
        </div>
      </div>
    </>
  );
};

export default CategoryOption;
