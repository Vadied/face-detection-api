const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "face_detection",
  },
});

const bcryptUtils = require("./bcryptUtils");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const getUserByEmail = (email) => db("users").where({ email }).select("*");

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db("users")
    .where({ email })
    .select("*")
    .then((user) => {
      if (!user.length) res.status(404).json("No user found");
      res.json(user[0]);
    })
    .catch((e) => res.status(400).json("Error during sign in"));
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcryptUtils.hashPassword(password);
  const newUser = {
    name,
    email,
    joined: new Date(),
  };
  const newLogin = {
    hash,
    email
  };

  db.transaction(trx => {
    trz.insert(newLogin).into('login')
    .then(loginEmail => {
      db("users")
      .insert(newUser)
      .then(() => res.json(newUser))
    })
  })
  db("users")
    .returning("*")
    .insert(newUser)
    .then((user) => {
      db("login").returning("*").insert(newLogin);
    })
    .catch((e) => res.status(400).json("Error in registration"));
  res.json(newUser);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (!user.length) res.status(404).json("No user found");

      res.json(user[0]);
    });
});

app.get("/profiles", (req, res) => {
  res.json(database.users);
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
  .where("id", "=", id)
  .increment("entries", 1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(err => res.status(400).json("Error entries"));
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
