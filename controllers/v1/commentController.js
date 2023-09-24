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
module.exports.getAll = async (req, res) => {
  const comments = await commentModel.find({}).populate("courseID").populate("creator", "-password").lean();

  return res.json(comments);
};

module.exports.remove = async (req, res) => {
  const deletedComment = await commentModel.findOneAndRemove({ _id: req.params.id });

  if (!deletedComment) {
    return res.status(404).json({
      message: "comment not Found",
    });
  }

  return res.json(deletedComment);
};

module.exports.remove = async (req, res) => {
  const acceptedComment = await commentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      isAccept: 1,
    }
  );

  if (!acceptedComment) {
    return res.status(404).json({
      message: "comment not found !!",
    });
  }
  return res.json({ message: "comment accepted successfully" });
};
module.exports.reject = async (req, res) => {
  const rejectedComment = await commentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      isAccept: 0,
    }
  );

  if (!rejectedComment) {
    return res.status(404).json({
      message: "comment not found !!",
    });
  }
  return res.json({ message: "comment rejected successfully" });
};

module.exports.answer = async (req, res) => {
  const { body } = req.body;

  const acceptedComment = await commentModel.findByIdAndUpdate({ _id: req.params.id }, { isAccept: 1 });

  if (!acceptedComment) {
    return res.status(404).json({
      message: "comment not found !",
    });
  }

  const answerComment = await commentModel.create({
    body,
    courseID: acceptedComment.courseID,
    creator: req.user._id,
    isAnswer: 1,
    isAccept: 1,
    mainCommentID: req.params.id,
  });

  return res.status(201).json(answerComment);
};
