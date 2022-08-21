import { useEffect } from "react";
import {
  useAppDispatch,
  useGetUser,
  useIsLogged,
} from "../../../control/hooks";
import { setCouncilAsync } from "../../../control/redux/councils/councilsAPI";
import { getUserAsync } from "../../../control/redux/user/usersAPI";

//models
import { Stages } from "../../../model/stagesModelC";

const stages = Object.values(Stages);


const SetCouncil = () => {
  const dispatch = useAppDispatch();
  const isLogged = useIsLogged();
  const user = useGetUser();

  useEffect(() => {
    if (isLogged === false) {
      dispatch(getUserAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(ev: any) {
    ev.preventDefault();
    try {
      if (isLogged === false) throw new Error("user is no logged");
      if (!user) throw new Error("User was not found");

      let { title, description, imgs, stages } = ev.target.elements;

      title = title.value;
      description = description.value;
      //  const stagesArray:Stages[] = [];

      let stagesArray: Stages[] = Object.values(stages);

      stagesArray = stagesArray
        .map((stage: any) => {
          if (stage.checked) return stage.value;
          return null;
        })
        .filter((el) => el !== null);

      // const {data} = await axios.post('/api/councils/add-council',{title, description, stages:stagesArray});
      // dispatch(addCouncil({ title, description, stages: stagesArray }));
      dispatch(setCouncilAsync({ title, description, stages: stagesArray }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="page">
      <header>יצירת קבוצת התייעצות חדשה</header>
      <form onSubmit={handleSubmit}>
        <h2>פרטים כללים</h2>
        <input type="text" name="title" placeholder="כותרת" />
        <textarea name="description" placeholder="תיאור הנושא" />
        <input type="file" name="imgs" placeholder="תמונה" />
        <h2> מבנה ההתיעצות</h2>
        <fieldset>
          {stages.map((stage, i) => {
            if (stage !== Stages.INTRO) {
              return (
                <p key={`${i}-stages`}>
                  <label htmlFor={stage}>{stage}</label>
                  <input
                    type="checkbox"
                    name="stages"
                    value={stage}
                    id={stage}
                  />
                </p>
              );
            } else {
              return null;
            }
          })}
        </fieldset>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default SetCouncil;
