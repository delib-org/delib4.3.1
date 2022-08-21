import { useIsLogged } from "../../../control/hooks";

//components
import HomeIntro from "./HomeIntro";
import HomeMain from "./HomeMain";

const Home = () => {
  const isLogged = useIsLogged();
  return (
    <div className="page">
      {isLogged?<HomeMain/>:<HomeIntro/>}
    </div>
  )
}

export default Home