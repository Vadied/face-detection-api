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
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('Connected to Postgres');
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await db("login").where("email", "=", email).select("hash");


    const isValid = await bcryptUtils.comparePassword(password, login[0].hash);
    if (!isValid)
      res.status(400).json("Wrong password or email");

    const users = await db("users").where("email", "=", email).select("*");
    if (!users[0]) res.status(400).json("Unable to get user");

    res.json(users[0]);
  } catch (err) {
    res.status(400).json("Error during sign in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    name,
    email,
    joined: new Date(),
  };
  const hash = bcryptUtils.hashPassword(password);
  const newLogin = {
    hash,
    email,
  };
  db.transaction((trx) => {
    trx("login")
      .insert(newLogin)
      .then(async () => {
        const users = await trx("users").returning("*").insert(newUser);
        res.json(users[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res.status(400).json("Error during registration");
  });
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const user = await db.select("*").from("users").where({ id });

  if (!user.length) res.status(404).json("No user found");

  res.json(user[0]);
});

app.get("/profiles", (req, res) => {
  res.json(database.users);
});

app.put("/image", async (req, res) => {
  const { id } = req.body;
  try {
    const entries = await db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries");
    res.json(entries[0]);
  } catch (err) {
    console.log("image error", err);
    res.status(400).json("Error entries");
  }
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
