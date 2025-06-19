const express = require("express");
const router = express.Router();
const {
  saveContact,
  deleteContact,
  getContacts,
  replyToContact,
} = require("../controllers/contactController");

router.post("/post", saveContact); // Save contact message
router.get("/get", getContacts); // Get all contacts
router.delete("/delete/:id", deleteContact); // Delete by ID
router.put("/reply/:id", replyToContact);//update by id

module.exports = router;
