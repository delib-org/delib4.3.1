import CouncilModel, { CouncilSchemaJoi, Stages } from "../model/councilModel";
import NewsItemModel from "../model/newsModel";
import { getUserFromDB } from "./usersCont";

export async function setCouncil(req, res) {
  try {
    const { council} = req.body;
   
    console.log('req.userId',req.userId)
    if (!council) throw new Error("No council in body");
    if(!req.userId) throw new Error('No creator in req.user');

    const creator = await getUserFromDB(req.userId);
  
    council.creator = creator;


    let councilDB;
    if (council._id) {
      councilDB = await CouncilModel.findOneAndUpdate(
        { _id: council._id },
        council,
        {
          new: true,
          upsert: true,
        }
      );
    } else {
     
      councilDB = await CouncilModel.create(council);
    }

    console.log(councilDB);

    await NewsItemModel.create({
      council:councilDB,
      creator,
      councilStage:Stages.INTRO,
      message:'Council was created',
      time:new Date()

    })

    res.send({
      title: councilDB.title,
      description: councilDB.description,
      imgs: councilDB.imgs,
      _id: councilDB._id,
      stages: councilDB.stages
    });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}
