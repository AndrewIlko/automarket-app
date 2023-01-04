const CarLot = ({ data: { image, make, model } }) => {
  return (
    <li className="w-full h-50 rounded-xl flex border overflow-hidden">
      <div className="w-2/4">
        <img className="w-full" src={image} />
      </div>

      <div className="p-3">
        <h1>
          {make} {model}
        </h1>
      </div>
    </li>
  );
};

export default CarLot;
