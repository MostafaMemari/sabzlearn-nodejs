const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  // const authHeader = req.headers.authorization.split(" ")
  const authHeader = req.header("Authorization")?.split(" ");

  if (authHeader?.length != 2) {
    return res.status(403).json({
      message: "This Route is protected and you can't have access to it !!",
    });
  }
  const token = authHeader[1];
  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(jwtPayload.id).lean();

    Reflect.deleteProperty(user, "password");

    req.user = user;

    next();
  } catch (error) {
    return res.json(error);
  }
};
