const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");

const banUserModel = require("../../models/banUserModel");
const userModel = require("../../models/userModel");

module.exports.banUser = async (req, res) => {
  const { id } = req.params;
  const mainUser = await userModel.findOne({ _id: id }).lean();
  const banUserResult = await banUserModel.create({ phone: mainUser.phone });

  if (banUserResult) {
    return res.status(200).json({ message: "user Ban successfully :))" });
  }
  return res.status(500).json({ message: "server Error !!" });
};

module.exports.getAll = async (req, res) => {
  const users = await userModel.find({}).select("-password").lean();

  return res.json(users);
};

module.exports.removeUser = async (req, res) => {
  const { id } = req.params;
  const isValiduserID = isValidObjectId(id);

  if (!isValiduserID) {
    return res.status(409).json({
      message: "User ID is not Valid",
    });
  }

  const removedUser = await userModel.findByIdAndRemove({ _id: id });
  if (!removedUser) {
    return res.status(404).json({
      message: "There is no user !!",
    });
  }
  return res.status(200).json({
    message: "User Removed Successfully :))",
  });
};

module.exports.changeRole = async (req, res) => {
  const { id } = req.body;

  const isValiduserID = isValidObjectId(id);

  if (!isValiduserID) {
    return res.status(409).json({
      message: "User ID is not Valid",
    });
  }

  const user = await userModel.findOne({ _id: id });

  const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, { $set: { role: newRole } });
  if (updatedUser) {
    return res.json({
      message: "user Role Changed Successfully :))",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const { username, name, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          username,
          name,
          email,
          password: hashedPassword,
          phone,
        },
      }
    )
    .select("-password")
    .lean();

  console.log(user);

  return res.json(user);
};
