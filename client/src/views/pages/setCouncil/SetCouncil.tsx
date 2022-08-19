import React from 'react'

//models
import { Stages } from '../../../model/stagesModelC';

const stages = Object.values(Stages);
console.log(stages)

const SetCouncil = () => {

async function handleSubmit(ev:any){
  try {
    
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className='page'>
      <header>
        יצירת קבוצת התייעצות חדשה
      </header>
      <form onSubmit={handleSubmit}>
      <h2>פרטים כללים</h2>
        <input type="text" name="title" placeholder='כותרת' />
        <textarea name="description" placeholder='תיאור הנושא' />
        <input type="file" name="imgs" placeholder='תמונה' />
        <h2> מבנה ההתיעצות</h2>
        <fieldset>
          {stages.map((stage,i)=> (
          <div>
 <input type="checkbox" name={stage} id={stage} checked />
      <label for={stage}>Scales</label>
          </div>
          )}
        </fieldset>
       
          {stages.map((stage,i)=>{
return <option value={stage}></option>
          }}
        
      </form>
     
    </div>
  )
}

export default SetCouncil