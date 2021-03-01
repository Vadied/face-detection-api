const updateEntries = async (req, res, db) => {
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
};

const getUserById = async (req, res, db) => {
  const { id } = req.params;
  const user = await db.select("*").from("users").where({ id });

  if (!user.length) res.status(404).json("No user found");

  res.json(user[0]);
};

module.exports = {
  updateEntries,
  getUserById
};
