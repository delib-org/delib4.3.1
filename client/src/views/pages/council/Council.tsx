import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useIsLogged, useAppSelector} from "../../../control/hooks";
import { getCouncilAsync } from "../../../control/redux/councils/councilsAPI";
import { getUserAsync } from "../../../control/redux/user/usersAPI";

const Council = () => {
  const dispatch = useAppDispatch();
  const { councilId } = useParams();
  const council = useAppSelector(state=>state.councils.councils.find(cncl=>cncl._id === councilId))

console.log(council)
  useEffect(() => {
    if (councilId) dispatch(getCouncilAsync(councilId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);

  useEffect(() => {
    dispatch(getUserAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [councilId]);
  return <div>Council: {council?council.title:councilId}</div>;
};

export default Council;
