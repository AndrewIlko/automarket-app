import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CARS_URL } from "../functions/restFunc";
import Pagination from "./Pagination";
import uuid from "react-uuid";
import { filterActions } from "../features/filterReducer";
import Loading from "./Loading";
import PageTracker from "./PageTracker";
import { Link } from "react-router-dom";
import CarLot from "./CarLot";

const Cars = () => {
  const state = useSelector((state) => state.filter);
  const [length, setLength] = useState(0);
  const [limit, setLimit] = useState(5);
  const [list, setList] = useState(null);
  const [page, setPage] = useState(null);
  const [countOfPages, setCountOfPages] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const { deleteTypeValue } = filterActions;

  useEffect(() => {
    setList(null);
    setIsLoaded(false);
    (async () => {
      await axios
        .get(`http://localhost:5000/cars?${CARS_URL(state)}`)
        .then((res) => res.data)
        .then((res) => {
          setLength(res.length);
          setCountOfPages(Math.ceil(res.length / limit));
          setPage(1);
          setIsLoaded(true);
        });
    })();
  }, [state]);

  useEffect(() => {
    if (isLoaded) {
      setList(null);
      (async () => {
        await axios
          .get(`http://localhost:5000/cars-list?page=${page}&&limit=${limit}`)
          .then((res) => res.data)
          .then((res) => {
            setList([...res]);
          });
      })();
    }
  }, [isLoaded, page]);

  return (
    <>
      {!list ? (
        <Loading />
      ) : (
        <>
          <div className="max-w-[998px] w-full mx-auto flex flex-1 flex-col">
            <PageTracker resultsCount={list.length} />
            <div className="flex gap-[15px] flex-1">
              <div className="w-1/4 bg-white rounded p-[18px] flex flex-col">
                <Link className="text-blue-600 font-semibold text-sm">
                  Detailed Search
                </Link>
                <hr className="my-4" />
              </div>
              <div className="flex flex-col w-3/4 bg-white rounded px-[17px] py-[13px] gap-5 justify-between">
                <div className="flex flex-col">
                  <div className="w-full mb-[18px]">
                    <h2 className="text-[20px] font-semibold">
                      {length} Ads matching your search criteria
                    </h2>
                  </div>
                  <ul className="w-full flex gap-2.5">
                    {Object.entries(state)
                      .filter(
                        (option) => option[0] != "category" && option[1] != ""
                      )
                      .map((option) => {
                        const key = option[0];
                        const value = option[1];
                        return (
                          <li
                            key={uuid()}
                            className="px-2 py-1 text-sm rounded-[4px] bg-slate-200 flex gap-1.5 items-center border"
                          >
                            <span>{value}</span>
                            <span className="flex items-center relative w-[14px] h-full">
                              <i
                                className="material-icons text-sm h-fit absolute top-[1px] cursor-pointer"
                                onClick={() => {
                                  dispatch(deleteTypeValue(key));
                                }}
                              >
                                close
                              </i>
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div className="flex flex-col flex-1">
                  <ul className="w-full flex flex-col gap-5">
                    {list &&
                      list.map(({ make, model, ...car }) => {
                        console.log(car);
                        return (
                          <CarLot
                            key={uuid()}
                            data={{ make, model, image: car.images.mainImage }}
                          />
                        );
                      })}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  {countOfPages && (
                    <Pagination
                      number={countOfPages}
                      setPage={setPage}
                      page={page}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cars;
