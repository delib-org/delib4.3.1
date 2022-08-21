import { useEffect } from "react";
import { useAppDispatch, useIsLogged } from "../../../control/hooks";
import { getUserAsync } from "../../../features/user/usersAPI";

//components
import HomeIntro from "./HomeIntro";
import HomeMain from "./HomeMain";

const Home = () => {
  const isLogged = useIsLogged();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLogged) dispatch(getUserAsync());
  }, [dispatch,isLogged]);
  return <div className="page">{isLogged ? <HomeMain /> : <HomeIntro />}</div>;
};

export default Home;
