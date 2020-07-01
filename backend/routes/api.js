const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/getDetails", (req, res) => {
  res.status(200).json({
    message: "This is the message after successfull log in",
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  // Get content from file
  let contents = fs.readFileSync("userData.json");
  // Define to JSON type
  let jsonContent = JSON.parse(contents);
  // Get Value from JSON

  console.log("Email:", jsonContent.email);
  console.log("Password:", jsonContent.password);
  if (
    jsonContent.email === req.body.email &&
    jsonContent.password === req.body.password
  ) {
    res.status(200).json({
      token: "secret.key",
      email: req.body.email,
      message: "Logged in successfully!",
    });
  } else {
    res.status(401).json({
      message: "Please enter valid credentials",
    });
  }
});
module.exports = router;
