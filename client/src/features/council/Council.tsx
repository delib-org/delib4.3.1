import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useIsLogged,
} from "../../control/hooks";
import { getCouncilAsync } from "../councils/councilsAPI";
import { getUserAsync } from "../user/usersAPI";
import Chat from "./chat/Chat";

const Council = () => {
  const isLogged = useIsLogged();
  const dispatch = useAppDispatch();
  const { councilId } = useParams();
  const council = useAppSelector((state) =>
    state.councils.councils.find((cncl) => cncl._id === councilId)
  );

  console.log(council);
  useEffect(() => {
    if (councilId && councilId.length === 24)
      dispatch(getCouncilAsync(councilId));

    if (!isLogged) dispatch(getUserAsync());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);


  return (
    <div>
      <h1>Council: {council ? council.title : councilId}</h1>
      {council && councilId ? <Chat council={council} /> : null}
    </div>
  );
};

export default Council;
