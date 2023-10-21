const courseUserModel = require("./../../models/courseUserModel");

exports.getAll = async (req, res) => {
  const orders = await courseUserModel.find({ user: req.user._id }).populate("courseID", "name href").lean();

  return res.json(orders);
};

exports.getOne = async (req, res) => {
  // Validate
  const order = await courseUserModel.findOne({ _id: req.params.id }).populate("courseID").lean();

  return res.json(order);
};
