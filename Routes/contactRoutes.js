const express = require("express");
const contactController = require("../Controller/contactController");
const tokenValidator = require("../Handler/tokenValidator");
const router = express.Router();

router.use(tokenValidator.validate);

router
  .route("/")
  .get(contactController.getContacts)
  .post(contactController.createContacts);


// router.get("/", (req, res) => {
//   res.send('Hello Worldzy!')
// })

router
  .route("/:id")
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);
  
  module.exports = router;
