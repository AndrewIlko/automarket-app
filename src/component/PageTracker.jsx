import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageTracker = ({ resultsCount }) => {
  const state = useSelector((state) => state.filter);
  return (
    <>
      <ul className="flex w-full my-4 mb-14 text-xs text-[#5a5e66]">
        <li>
          <Link className="underline cursor-pointer" to="/">
            Home
          </Link>
        </li>
        <li className="before:content-['\00BB'] before:px-1.5">
          <Link className="underline cursor-pointer" to="/">
            My{" "}
            {state.category == "light"
              ? "Car"
              : (() => {
                  const word = state.category.split("");
                  word[0] = word[0].toUpperCase();
                  return word.join("");
                })()}{" "}
            Search
          </Link>
        </li>
        <li className="before:content-['\00BB'] before:px-1.5">
          {resultsCount} results
        </li>
      </ul>
    </>
  );
};

export default PageTracker;
