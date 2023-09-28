const nodemailer = require("nodemailer");
const contactModel = require("../../models/contactModel");

module.exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({});

  return res.json(contacts);
};
module.exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;
  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
  });

  return res.status(201).json(contact);
};
module.exports.remove = async (req, res) => {
  const deletedContact = await contactModel.findOneAndRemove({ _id: req.params.id });

  if (!deletedContact) {
    return res.status(404).json({ message: "contact not found" });
  }

  return res.json(deletedContact);
};
module.exports.answer = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "daneshnext@gmail.com",
      pass: "sjch cswn egop oltw",
    },
  });
  const mailOptions = {
    form: "daneshnext@gmail.com",
    to: req.body.email,
    subject: "پاسخ پیغام شما از سمت آکادمی سبز لرن",
    text: req.body.answer,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.json({ message: error });
    } else {
      const contact = await contactModel.findOneAndUpdate(
        { email: req.body.email },
        {
          answer: 1,
        }
      );
      return res.json({ message: "Email Send Successfully :))" });
    }
  });
};
