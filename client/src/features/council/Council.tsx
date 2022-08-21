import { useEffect} from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../control/hooks";
import { getCouncilAsync } from "../../control/redux/councils/councilsAPI";
import { getUserAsync } from "../../control/redux/user/usersAPI";
import Chat from "./chat/Chat";

const Council = () => {
  const dispatch = useAppDispatch();
  const { councilId } = useParams();
  const council = useAppSelector((state) =>
    state.councils.councils.find((cncl) => cncl._id === councilId)
  );

  console.log(council);
  useEffect(() => {
    if (councilId && councilId.length === 24)
      dispatch(getCouncilAsync(councilId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);

  useEffect(() => {
    dispatch(getUserAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);
  return (
    <div>
      <h1>Council: {council ? council.title : councilId}</h1>
      {council && councilId?<Chat council={council} />:null}
    </div>
  );
};

export default Council;
