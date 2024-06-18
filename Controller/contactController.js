const asyncHandler = require("express-async-handler");
const Contact = require("../Model/contactModel");

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find();
  // const contacts = await Contact.find({ user_id: req.user.id });
  console.log(contacts);
  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
};


// exports.getContacts = 
// async (req, res) => {
//   const contacts = await Contact.find({ user_id: req.user.id });
//   console.log("Hello there", contacts)
//   res.status(200).json({
//     status: "success",
//     data: {
//       contacts,
//     }
//   })
// }



exports.createContacts = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  if (!name || !email || !phoneNumber) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const newContact = await Contact.create({
    name,
    email,
    phoneNumber,
    user_id: req.user.id,
  });
  res.status(201).json({
    status: "success",
    data: {
      newContact,
    },
  });
});

exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact not found");
  }
  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

exports.updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact not found");
  }
  if (contact.user_id.toString !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedContact,
    },
  });
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact not found");
  }
  if (contact.user_id.toString !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    data: null,
  });
});
