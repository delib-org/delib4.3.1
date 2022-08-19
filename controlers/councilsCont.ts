import CouncilModel, { CouncilSchemaJoi } from "../model/councilModel";
import NewsItemModel from "../model/newsModel";

export async function setCouncil(req, res) {
  try {
    const { council, creator } = req.body;
   
    if (!council) throw new Error("No council in body");
    if(!creator) throw new Error('No creator in body');



    const { error } = CouncilSchemaJoi.validate(council);


    if (error) throw error;
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
      creator:
    })

    res.send({
      title: councilDB.title,
      description: councilDB.description,
      imgs: councilDB.imgs,
      _id: councilDB._id,
      stages: councilDB.stages,
    });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}
