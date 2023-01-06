import WrapperSM from "../WrapperSM";
import ImageUploading from "react-images-uploading";
import { useState } from "react";
import SelectSellPage from "../SelectSellPage";
import { useDispatch, useSelector } from "react-redux";
import { sellActions } from "../../features/sellReducer";
import axios from "axios";

const SellCarPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { images, year, price } = useSelector((state) => state.sell);
  const state = useSelector((state) => state.sell);
  console.log(useSelector((state) => state.sell));
  const { setImages, setParam, setImageOrder, clearAll } = sellActions;
  const maxNumber = 3;

  const onChange = (imageList) => {
    dispatch(setImages(imageList));
  };

  const addCar = async () => {
    setIsLoading(true);
    await axios
      .post(
        "http://localhost:5000/add-car",
        { data: { ...state } },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
      });
    setIsLoading(false);
  };

  return (
    <>
      <WrapperSM bg="bg-white">
        <div className="flex justify-between px-5 my-5">
          <h1 className="text-3xl font-semibold ">Adding an ad</h1>
          <button
            onClick={() => {
              dispatch(clearAll());
            }}
          >
            Clear all
          </button>
        </div>
        <form
          className="px-5"
          onSubmit={(e) => {
            e.preventDefault();
            addCar();
          }}
        >
          <div className="w-[96%] mx-auto p-2.5">
            <div className="w-full flex items-center gap-3 relative">
              <div className="w-[30px] h-[30px] rounded-full bg-blue-200 flex justify-center items-center absolute -left-10">
                1
              </div>
              <div className="text-base">Upload 2 - 3 images</div>
            </div>

            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper flex flex-col gap-4">
                  {/* <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click
                </button> */}
                  <div
                    {...dragProps}
                    className="h-24 w-full rounded-md flex justify-center items-center border-[1px] border-[rgb(0,0,0,0.25)] hover:border-red-600 hover:text-red-600 mt-5 transition-all cursor-pointer"
                    onClick={() => {
                      if (images.length != 3) onImageUpload();
                    }}
                  >
                    Click or Drop here
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className={`image-item relative `}>
                        <img
                          src={image["url"]}
                          alt=""
                          className={`cursor-pointer rounded ${
                            image.url == images[0].url &&
                            "border-2 border-red-600"
                          }`}
                          onClick={() => {
                            dispatch(setImageOrder(index));
                          }}
                        />
                        <div className="image-item__btn-wrapper absolute top-1 right-1">
                          <button onClick={() => onImageRemove(index)}>
                            <span className="material-symbols-outlined text-red-600">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="w-[96%] mx-auto p-2.5">
            <div className="w-full flex items-center gap-3 relative">
              <div className="w-[30px] h-[30px] rounded-full bg-blue-200 flex justify-center items-center absolute -left-10">
                2
              </div>
              <div className="text-base">Basic information</div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <div className="flex gap-5">
                <div className="w-24">Category</div>
                <SelectSellPage type="category" />
              </div>
              <div className="flex gap-5">
                <div className="w-24">Make</div>
                <SelectSellPage type="make" />
              </div>
              <div className="flex gap-5">
                <div className="w-24">Model</div>
                <SelectSellPage type="model" />
              </div>
              <div className="flex gap-5">
                <div className="w-24">Year</div>
                <input
                  type="text"
                  className="border px-1 rounded text-sm w-28"
                  value={year}
                  onChange={(e) => {
                    dispatch(setParam({ type: "year", param: e.target.value }));
                  }}
                  required
                />
              </div>
              <div className="flex gap-5">
                <div className="w-24">City</div>
                <SelectSellPage type="city" />
              </div>
              <div className="flex gap-5">
                <div className="w-24">Price</div>
                <input
                  type="text"
                  className="border px-1 rounded text-sm w-28"
                  value={price}
                  onChange={(e) => {
                    dispatch(
                      setParam({ type: "price", param: e.target.value })
                    );
                  }}
                  required
                />
              </div>
              {/* <div className="mt-10 flex gap-5">
                <div>Vin</div>
                <input type="text" className="border rounded" required />
              </div> */}
            </div>
          </div>
          <button className="px-4 py-1.5 shaadow bg-green-500 w-[200px] text-white rounded font-medium ml-5 mt-[50px] mb-5">
            {isLoading ? "Adding..." : "Add"}
          </button>
        </form>
      </WrapperSM>
    </>
  );
};

export default SellCarPage;
