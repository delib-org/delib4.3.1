import { Outlet } from "react-router-dom";
import HomeIntro from "../home/HomeIntro";
import { useIsLogged } from "../../../control/hooks";
import Home from "../home/Home";

const Main = () => {
  const isLogged = useIsLogged();
  console.log("isLogged", isLogged);
  return (
    <div>
      {isLogged?<Home/>:<HomeIntro />}
    </div>
  );
};

export default Main;
