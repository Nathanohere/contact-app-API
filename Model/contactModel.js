const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please provide a contact name"],
  },
  email: {
    type: String,
    required: [true, "Please provide the contact email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
},{
  timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
