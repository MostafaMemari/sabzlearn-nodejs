const commentModel = require("../../models/commentModel");
const courseModel = require("../../models/courseModel");

module.exports.create = async (req, res) => {
  const { body, courseHref, score } = req.body;

  const course = await courseModel.findOne({ href: courseHref }).lean();

  const comment = await commentModel.create({
    body,
    courseID: course._id,
    creator: req.user._id,
    score,
    isAnswer: false,
    isAccept: false,
  });

  return res.status(200).json(comment);
};
