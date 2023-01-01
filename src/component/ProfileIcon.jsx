import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userReducer";

const ProfileIcon = () => {
  const dispatch = useDispatch();
  const { setToken } = userActions;
  const [popup, setPopup] = useState(false);
  return (
    <>
      <div className="relative">
        <div
          className="h-10 w-10 border-[2px] rounded-lg"
          onClick={() => {
            setPopup(!popup);
          }}
        ></div>
        {popup && (
          <div className="absolute w-28 h-32 border  rounded right-0 mt-1 flex flex-col-reverse text-black items-center px-2.5 py-1.5 bg-white">
            <div
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
