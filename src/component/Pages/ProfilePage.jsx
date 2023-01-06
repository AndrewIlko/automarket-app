import axios from "axios";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import CarLot from "../CarLot";
import { Link } from "react-router-dom";
import WrapperSM from "../WrapperSM";

const ProfilePage = () => {
  const [list, setList] = useState(null);

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
      <WrapperSM>
        <div className="text-[18px] my-5"></div>
        <div className="w-full bg-white flex flex-col flex-1 rounded px-5">
          <div className="flex justify-end my-5">
            <Link to="/sell-car">
              <button className="px-5 py-1.5 border rounded flex items-center gap-2 font-medium text-sm shadow">
                <i className="material-icons text-[red] text-xl">sell</i>
                <span>Sell auto</span>
              </button>
            </Link>
          </div>
          <ul className="w-2/3 flex flex-col gap-5 mt-3 mx-auto">
            {list &&
              list.map(({ make, model, price, ...car }) => {
                console.log(car);
                return (
                  <CarLot
                    key={uuid()}
                    data={{
                      make,
                      model,
                      image: car.images[0].url,
                      price,
                    }}
                  />
                );
              })}
          </ul>
        </div>
      </WrapperSM>
    </>
  );
};

export default ProfilePage;
