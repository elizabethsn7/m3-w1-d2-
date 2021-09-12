const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const path = require("path");
const auth = require("http-auth");

const router = express.Router();
const Registration = mongoose.model( "Registration" );

const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd"),
} );

router.get("/", function (req, res) {
  res.render("form", { title: "Registration form" });
});

router.get(
  "/registrations",
  basic.check((req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render("index", { title: "Listing registrations", registrations });
      })
      .catch(() => {
        res.send("Sorry! Something went wrong.");
      });
  })
);

router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  function (req, res) {
    // console.log(req.body);
    var errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration
        .save()
        .then(() => {
          res.send("Thank you for your registration!");
        })
        .catch((err) => {
          res.send("Sorry! Something went wrong.");
        });
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
