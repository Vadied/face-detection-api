const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bcryptUtils = require("./bcryptUtils");

const app = express();

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
      id: "1",
      hash: "",
      email: "jhon@gmail.com",
    },
    {
      id: "2",
      hash: "",
      email: "sally@gmail.com",
    },
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = database.users.find((u) => email === u.email) || null;
  if (!user) return res.status(404).json("No such user");

  const hash = database.login.find((l) => user.email === l.email) || "";
  if (!bcrypt.comparePassword(password, hash))
    return res.status(400).json("Wrong password");

  res.send(user);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const user = database.users.find((u) => email === u.email) || null;
  if(user)
    res.status(400).json("Email already in database");

  const newUser = {
    name,
    email,
    id: database.users.length + 1,
    joined: new Date(),
    entries: 0,
  };

  const newLogin = {
    hash: bcryptUtils.hashPassword(password),
    id: newUser.id,
    email: newUser.email,
  };

  database.users.push(newUser);
  database.login.push(newLogin);
  res.send(newUser);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const user = database.users.find((u) => req.body.email === u.email) || null;
  if (!user) return res.status(404).json("no such user");

  res.json(user);
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  const user = database.users.find((u) => req.body.email === u.email) || null;
  if (!user) return res.status(404).json("no such user");

  user.entries++;
  res.json(user.entries);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
