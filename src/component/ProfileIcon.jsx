import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../features/userReducer";

const ProfileIcon = () => {
  const dispatch = useDispatch();
  const { setToken } = userActions;
  const [popup, setPopup] = useState(false);
  return (
    <>
      <div className="relative">
        <div
          className="text-black flex items-center gap-4 text-sm p-2 cursor-pointer border border-[rgb(0,0,0,0.25)] rounded-lg"
          onClick={() => {
            setPopup(!popup);
          }}
        >
          <i className="material-icons select-none">person</i>
        </div>
        {popup && (
          <div
            className="absolute w-28 h-32 border rounded right-0 mt-1 flex flex-col text-black items-center bg-white shadow-md justify-end text-sm font-medium"
            onMouseLeave={() => {
              setPopup(false);
            }}
          >
            <div className="flex flex-1 flex-col w-full">
              <Link to="/profile">
                <div
                  className="py-1 text-center cursor-pointer"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  My cars
                </div>
              </Link>
              <hr className="w-full" />
            </div>
            <hr className="w-full" />
            <div
              className="py-1 cursor-pointer "
              onClick={() => {
                sessionStorage.removeItem("token");
                dispatch(setToken(false));
                setPopup(false);
              }}
            >
              Sign out
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileIcon;
