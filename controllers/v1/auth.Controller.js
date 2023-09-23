const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerValidator = require("../../validators/register");
const banUserModel = require("../../models/banUserModel");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }

  const { username, name, email, password, phone } = req.body;

  const isUserExists = await userModel.findOne({ $or: [{ username }, { email }] });

  const isUserBan = await banUserModel.find({ phone });

  if (isUserBan.length) {
    return res.status(409).json({
      message: "This Phone Number Ban",
    });
  }

  if (isUserExists) {
    return res.status(409).json({
      message: "username or email is Duplicated",
    });
  }

  const countOfUsers = await userModel.count();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    name,
    email,
    phone,
    password: hashedPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day" });

  return res.status(201).json({ user: userObject, accessToken });
};
exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return res.status(401).json({
      message: "There is No user with this email or username",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is Not Valid",
    });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day" });

  return res.json({ accessToken });
};
exports.getMe = async (req, res) => {};
