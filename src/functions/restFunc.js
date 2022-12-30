export const URL = (type, state) => {
  if (type == "model") {
    return `http://localhost:5000/filter/${type}/${state.make}`;
  } else {
    return `http://localhost:5000/filter/${type}`;
  }
};

export const CARS_URL = (state) => {
  const obj = [...Object.entries(state)]
    .filter((arr) => arr[1] != "")
    .map((arr) => `${arr[0]}=${arr[1]}`)
    .join("&");
  return obj;
};
