const { default: mongoose } = require("mongoose");
const categorieModel = require("../../models/categorieModel");
const commentModel = require("../../models/commentModel");
const courseModel = require("../../models/courseModel");
const courseUserModel = require("../../models/courseUserModel");
const sessionModel = require("../../models/sessionModel");

module.exports.create = async (req, res) => {
  const { name, description, support, href, price, status, discount, categorieID } = req.body;

  const course = await courseModel.create({
    name,
    description,
    creator: req.user._id,
    categorieID,
    support,
    price,
    href,
    status,
    discount,
    cover: req.file.filename,
  });

  const mainCourse = await courseModel.findById(course._id).populate("creator", "-password");

  return res.status(201).json(mainCourse);
};
exports.getAll = async (req, res) => {
  const courses = await courseModel.find({}).populate("categorieID").populate("creator").lean().sort({ _id: -1 });

  const registers = await courseUserModel.find({}).lean();
  const comments = await commentModel.find({}).lean();

  const allCourses = [];

  courses.forEach((course) => {
    let courseTotalScore = 5;
    const courseRegisters = registers.filter((register) => register.courseID.toString() === course._id.toString());

    const courseComments = comments.filter((comment) => {
      return comment.courseID.toString() === course._id.toString();
    });

    courseComments.forEach((comment) => (courseTotalScore += Number(comment.score)));

    allCourses.push({
      ...course,
      categoryID: course.categorieID.title,
      creator: course.creator.name,
      registers: courseRegisters.length,
      courseAverageScore: Math.floor(courseTotalScore / (courseComments.length + 1)),
    });
  });

  return res.json(allCourses);
};
module.exports.getOne = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).populate("creator", "-password").populate("categorieID").lean();

  const sessions = await sessionModel.find({ courseID: course._id });
  const courseStudentsCount = await courseUserModel.find({ courseID: course._id }).count();
  const comments = await commentModel
    .find({ courseID: course._id, isAccept: 1 })
    .populate("creator", "-password")
    .populate("courseID")
    .lean();

  const isUserRegisterToThisCourse = !!(await courseUserModel.findOne({
    user: req.user._id,
    courseID: course._id,
  }));

  let allComments = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) === String(answerComment.mainCommentID)) {
        allComments.push({
          ...comment,
          answerComment: {
            body: answerComment.body,
            creator: answerComment.creator.username,
          },
        });
      }
    });
  });

  res.json({ course, sessions, comments: allComments, courseStudentsCount, isUserRegisterToThisCourse });
};

module.exports.remove = async (req, res) => {
  const isObjectIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isObjectIDValid) {
    return res.status(409).json({
      message: "courseID is Not Valid !!!",
    });
  }

  const deletedCourses = await courseModel.findByIdAndRemove({
    _id: req.params.id,
  });

  if (!deletedCourses) {
    return res.status(404).json({
      message: "course Not Found !!!",
    });
  }

  return res.status(200).json(deletedCourses);
};

module.exports.createSession = async (req, res) => {
  const { title, free, time } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: "video.mp4",
    courseID: id,
  });

  return res.status(201).json(session);
};

module.exports.getAllSessions = async (req, res) => {
  const sessions = await sessionModel.find().populate("courseID", "name").lean();

  return res.json(sessions);
};

module.exports.getSessionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).lean();

  const session = await sessionModel.findOne({ _id: req.params.sessionID });
  const sessions = await sessionModel.findOne({ courseID: course._id });

  return res.json({ session, sessions });
};

module.exports.removeSession = async (req, res) => {
  const deletedCourses = await sessionModel.findOneAndDelete({ _id: req.params.id });

  if (!deletedCourses) {
    return res.status(404).json({ message: "Course not Found !!" });
  }
  return res.status(200).json(deletedCourses);
};

module.exports.register = async (req, res) => {
  const isUserAlreadyRegister = await courseUserModel.findOne({ user: req.user._id, course: req.params.id }).lean();

  if (isUserAlreadyRegister) {
    return res.status(409).json({
      message: "user Already registered in this course",
    });
  }

  const register = await courseUserModel.create({
    user: req.user._id,
    courseID: req.params.id,
    price: req.body.price,
  });

  return res.status(201).json({ message: "You Are registered Successfully", register });
};

module.exports.getCoursesByCaregory = async (req, res) => {
  const { href } = req.params;

  const categorie = await categorieModel.findOne({ href });

  if (categorie) {
    const categorieCourses = await courseModel.find({ categorieID: categorie._id });

    res.json(categorieCourses);
  } else {
    res.json([]);
  }
};

module.exports.getRelated = async (req, res) => {
  const { href } = req.params;

  const course = await courseModel.findOne({ href });

  if (!course) {
    return res.status(404).json({
      message: "course not Found !!",
    });
  }

  let relatedCourses = await courseModel.find({
    categorieID: course.categorieID,
  });

  relatedCourses = relatedCourses.filter((course) => course.href !== href);

  return res.json(relatedCourses);
};

module.exports.popular = async (req, res) => {
  const courses = await courseModel.find({}).lean();

  let countCommentByCourse = [];

  courses.forEach(async (course) => {
    const countComment = await commentModel.find({ courseID: course._id }).lean();
    countCommentByCourse.push({
      course: course.name,
      count: countComment.length,
    });
  });

  res.status(200).json(countCommentByCourse);
};
