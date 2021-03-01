const bcryptUtils = require("../bcryptUtils");

const handleSignin = async (req, res, db) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json("Wrong form submission. Please fill every input");

  try {
    const login = await db("login").where("email", "=", email).select("hash");

    const isValid = await bcryptUtils.comparePassword(password, login[0].hash);
    if (!isValid) res.status(400).json("Wrong password or email");

    const users = await db("users").where("email", "=", email).select("*");
    if (!users[0]) res.status(400).json("Unable to get user");

    res.json(users[0]);
  } catch (err) {
    res.status(400).json("Error during sign in");
  }
};

module.exports = {
  handleSignin,
};
