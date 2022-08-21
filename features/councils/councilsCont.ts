import CouncilModel, { CouncilSchemaJoi, Stages } from "./councilModel";
import NewsItemModel from "../news/newsModel";
import { getUserFromDB } from "../users/usersCont";

export async function setCouncil(req, res) {
  try {
    const { council} = req.body;
   
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

export async function getCouncil(req:any, res:any){
  try {
    const {councilId} = req.query;
    if(!councilId) throw new Error('no councilId in query');

    const councilDB = await CouncilModel.findById(councilId);
    if(!councilDB) throw new Error(`Couldnt find council ${councilId} in DB`);
    res.send({council:councilDB});

  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getCouncils(req:any, res:any){
  try {
   

    const councilsDB = await CouncilModel.find({});
    if(!councilsDB) throw new Error(`Couldnt find councils in DB`);
    res.send({councils:councilsDB});

  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

