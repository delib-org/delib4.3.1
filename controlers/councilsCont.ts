import CouncilModel, { CouncilSchemaJoi } from "../model/councilModel";

export async function setCouncil(req, res) {
  try {
    const { council } = req.body;
    console.log(council);
    if (!council) throw new Error("No council in body");
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
