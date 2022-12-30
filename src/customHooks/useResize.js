import { useEffect, useState } from "react";

const useResize = (target) => {
  const [height, setHeight] = useState(undefined);

  useEffect(() => {
    if (target.current) {
      setHeight(target.current.clientHeight);
    }
  }, [target]);

  return height;
};

export default useResize;
