const express = require("express");

const router = express.Router();

//@route       GET api/profile
//@description test route
//@access      Public
router.get("/", (req, res) => {
  res.send("user Profile");
});

module.exports = router;
