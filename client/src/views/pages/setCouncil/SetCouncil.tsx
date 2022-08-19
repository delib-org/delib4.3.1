import axios from "axios";
import { useAppDispatch } from "../../../control/hooks";
import { setCouncilAsync } from "../../../control/redux/councilsAPI";
import { addCouncil } from "../../../control/redux/councilsSlice";

//models
import { Stages } from "../../../model/stagesModelC";

const stages = Object.values(Stages);
console.log(stages);

const SetCouncil = () => {
  const dispatch = useAppDispatch();

  async function handleSubmit(ev: any) {
    ev.preventDefault();
    try {
      let { title, description, imgs, stages } = ev.target.elements;
      console.log({ title, description, imgs, stages });
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
      dispatch(setCouncilAsync({ title, description, stages: stagesArray }))
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
                <p>
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
