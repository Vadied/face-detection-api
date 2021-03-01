const bcryptUtils = require("../bcryptUtils");

const handleRegister = (req, res, db) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    res.status(400).json("Wrong form submission. Please fill every input");

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
};

module.exports = {
  handleRegister,
};
