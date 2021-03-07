const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const user = require("./controllers/user");
const image = require("./controllers/image");

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

app.get("/", async (req, res) => {
  const globalConstants = db("globalConstants")
    .where("active", "=", 1)
    .select("*");
  res.json(globalConstants);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  user.getUserById(req, res, db);
});

app.get("/profiles", (req, res) => {
  res.json(database.users);
});

app.post("/detection", async (req, res) => {
  const data = await image.faceDetection(req, res);
  res.json(data);
});

app.put("/image", (req, res) => {
  user.updateEntries(req, res, db);
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
