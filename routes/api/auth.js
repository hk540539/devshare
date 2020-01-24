const express = require("express");

const router = express.Router();

const auth = require("../../middlewear/auth");
const User = require("../../models/Users");

//@route       GET api/auth
//@description test route
//@access      Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
