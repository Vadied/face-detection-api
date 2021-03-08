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

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.json("it's working");
});

app.post("/signin", (req, res) => signin.handleSignin(req, res, db));
app.post("/register", (req, res) => register.handleRegister(req, res, db));
app.get("/profile/:id", (req, res) => user.getUserById(req, res, db));
app.get("/profiles", (req, res) => res.json(database.users));
app.post("/detection", (req, res) => image.faceDetection(req, res));
app.put("/image", (req, res) => user.updateEntries(req, res, db));

app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});
