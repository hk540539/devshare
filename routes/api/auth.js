const express = require("express");

const router = express.Router();

//@route       GET api/auth
//@description test route
//@access      Public
router.get("/", (req, res) => {
  res.send("user Auth");
});

module.exports = router;
