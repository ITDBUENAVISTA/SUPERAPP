const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.runEtl = functions.https.onRequest(async (req, res) => {
  try {
    const response = await fetch("https://api.devopssolutions.com.co/api/etl/run", {
      method: "POST",
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error ejecutando ETL",
    });
  }
});
