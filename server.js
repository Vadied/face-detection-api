const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require('./bcryptUtils'); 

const app = express();

app.use(bodyParser.json());
const database = {
  users: [
    {
      id: "1",
      name: "jhon",
      email: "jhon@gmail.com",
      joined: new Date(),
      entries: 0,
    },

    {
      id: "2",
      name: "sally",
      email: "sally@gmail.com",
      joined: new Date(),
      entries: 0,
    },
  ],
  login: [
      {
          id: '1',
          hash: '',
          email: 'jhon@gmail.com'
      },
      {
        id: '2',
        hash: '',
        email: 'sally@gmail.com'
    }
  ]
};

app.get("/", (req, res) => {
  res.send('backend running');
});

app.get("/signin", (req, res) => {
  const user = database.users.find((u) => req.body.email === u.email) || null;
  if (!user) return res.status(404).json("no such user");

  const hash = database.login.find((l) => user.email === l.email) || '';
  if (!bcrypt.compare(req.body.password, hash))
    return res.status(400).json("error logging in");

  res.send("success");
});

app.post("/register", (req, res) => {
  const newUser = {
    id: database.user.length,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hash(req.body.password),
    joined: new Date(),
    entries: 0,
  };
  database.user.push(newUser);
  res.send("register");
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const user = database.users.find((u) => req.body.email === u.email) || null;
  if (!user) return res.status(404).json("no such user");

  res.json(user);
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  const user = database.users.find((u) => req.body.email === u.email) || null;
  if (!user) return res.status(404).json("no such user");

  user.entries++;
  res.json(user.entries);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
