import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <>
      <div className="absolute h-full w-full flex justify-center items-center top-0 left-0">
        <ReactLoading
          type={"spinningBubbles"}
          color={"blue"}
          height={"40px"}
          width={"40px"}
        />
      </div>
    </>
  );
};

export default Loading;
