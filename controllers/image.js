const Clarifai = require("clarifai");

const { clarifai_Api_Key } = require("../constants.json");

const app = new Clarifai.App({
  apiKey: clarifai_Api_Key,
});

const faceDetection = async (req, res) => {
  const { urlField } = req.body;
  try {
  const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, urlField);
  res.json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json("Unable to work with API");
  }
};

module.exports = {
  faceDetection,
};
