const router = require('express').Router();
const bcrypt = require('bcryptjs'); 
const Users = require('./model.js');
const restricted = require('../restricted-middleware');

router.post("/register", (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
      });
  });
  
router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;

          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => 
        // console.log(err))
        res.send(err));
});

router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          res.status(500).json({
            message:
              "you can checkout any time you like, but you can never leave!!!!!",
          });
        } else {
          res.status(200).json({ message: "logged out" });
        }
      });
    } else {
      res.status(200).end();
    }
  });

module.exports = router;