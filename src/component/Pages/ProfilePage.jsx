import axios from "axios";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import CarLot from "../CarLot";
import AddCar from "../AddCar";

const ProfilePage = () => {
  const [list, setList] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/profile/cars", {
          headers: {
            authorization: `Bear ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data)
        .then((res) => setList(res));
    })();
  }, []);
  return (
    <>
      <div className="max-w-[998px] w-full mx-auto flex flex-1 flex-col">
        <div className="text-[18px] my-5"></div>
        <div className="w-full bg-white flex flex-col flex-1 rounded-lg p-5">
          <div className="flex justify-end">
            <button
              className="px-5 py-1 border rounded flex items-center gap-2 font-medium text-sm border-black"
              onClick={() => {
                setIsAdd(true);
              }}
            >
              <span>Add</span>
            </button>
          </div>
          <ul className="w-2/3 flex flex-col gap-5 mt-3 mx-auto">
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
      </div>
      {isAdd && <AddCar close={setIsAdd} />}
    </>
  );
};

export default ProfilePage;
