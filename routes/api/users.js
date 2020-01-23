const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//@route       POST api/users
//@description Register User
//@access      Public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),

    // username must be an email
    check("email", "please include valid email").isEmail(),
    // password must be at least 5 chars long
    check("password", "Enter a password of minimum length 5").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "User already exists" }] });
      }
      // get user gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "m"
      });

      user = new User({
        name,
        email,
        password,
        avatar
      });
      //encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.send("User registered");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
