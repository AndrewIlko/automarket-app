import Header from "./component/Header";
import Main from "./component/Main";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
