const Clarifai = require("clarifai");

const { clarifai_Api_Key } = require("../constants.json");

const app = new Clarifai.App({
  apiKey: clarifai_Api_Key,
});

const faceDetection = async (req, res) => {
  const { input } = req.body;
  return app.models.predict(Clarifai.FACE_DETECT_MODEL, input);
};

module.exports = {
  faceDetection,
};
