const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { generateToken, validateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");
const Users = require("../models/Users");
const { response } = require("express");

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      return res.send(users);
    })
    .catch(next);
});


router.get("/:name", (req, res, next) => {
  const { name } = req.params;
  Users.findAll({ where: { name: name }, include: "favorites" })
    .then((resp) => res.send(resp))
    .catch(next);
});

//  CREAR UN USUARIO   

router.post("/register", (req, res) => {
  Users.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});

router.post("/login", (req, res) => {
  
      
  const { email, password } = req.body;

 /*  console.log("  LOGINNNN  ", email, password); */     // ACÁ ME LLEGAN BIEN EL EMAIL Y EL PASSWORD

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const token = generateToken(user.id);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        token: token,
      };

      res.send(payload);
    });
  });
});

module.exports = router;