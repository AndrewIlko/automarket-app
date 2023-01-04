import { useEffect } from "react";

const AddCar = ({ close }) => {
  useEffect(() => {
    const pressKey = (e) => {
      if (e.key == "Escape") {
        close(false);
      }
    };
    window.addEventListener("keydown", pressKey, false);
    return () => window.removeEventListener("keydown", pressKey, false);
  });
  return (
    <>
      <div className="absolute w-full h-full bg-[rgb(0,0,0,0.5)] top-0 left-0 z-10"></div>
    </>
  );
};

export default AddCar;
