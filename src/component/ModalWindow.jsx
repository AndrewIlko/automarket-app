import { useEffect } from "react";

const ModalWindow = ({ close }) => {
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
      <div className="absolute w-full h-full bg-[rgb(0,0,0,0.5)] top-0 left-0 z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-white"></div>
      </div>
    </>
  );
};

export default ModalWindow;
