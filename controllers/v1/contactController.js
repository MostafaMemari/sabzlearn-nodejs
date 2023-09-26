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
module.exports.answer = async (req, res) => {};
