const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// Register
router.post("/register", async (req, res) => {
  try {
    const userEmailExist = await User.findOne({ email: req.body.email });
    const userExist = await User.findOne({ username: req.body.username });
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    if (userExist) {
      res.json({ message: "Name already exist", success: false });
      return false;
    }
    if (userEmailExist) {
      res.json({ message: "user Email already exist", success: false });
      return false;
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
      const user = await newUser.save();
      res.json({ message: "registration successfully", success: true });
      return true;
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
    return false;
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "User Does Not exist", success: false });
      return false;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(400).json({ message: "Password incorrect", success: false });
      return false;
    } else {
      res.status(200).json({ message: "Login success", success: true });
      return true;
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
    return false;
  }
});

module.exports = router;
