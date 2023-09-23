const { isValidObjectId } = require("mongoose");
const categorieModel = require("../../models/categorieModel");

module.exports.create = async (req, res, next) => {
  const { title, href } = req.body;

  const categorie = await categorieModel.create({ title, href });
  return res.status(201).json(categorie);
};
module.exports.getAll = async (req, res, next) => {
  const categories = await categorieModel.find({}).lean();
  return res.json(categories);
};
module.exports.remove = async (req, res, next) => {
  const { id } = req.params;

  const isValidID = isValidObjectId(id);

  if (!isValidID) {
    return res.status(409).json({
      message: "categorie ID is not Valid !!",
    });
  }

  const deletedCategorie = await categorieModel.findByIdAndDelete({ _id: id });

  return res.json(deletedCategorie);
};
module.exports.update = async (req, res, next) => {
  const { title, href } = req.body;
  const { id } = req.params;

  const isValidID = isValidObjectId(id);

  if (!isValidID) {
    return res.status(409).json({
      message: "categorie ID is not Valid !!",
    });
  }

  const updatedCategorie = await categorieModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title,
        href,
      },
    }
  );

  if (!updatedCategorie) {
    return res.status(404).json({
      message: "categorie not found",
    });
  }
  return res.json(updatedCategorie);
};
