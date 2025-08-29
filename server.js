const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// 🔹 Configure AWS (use your own keys & region)
AWS.config.update({
  accessKeyId: "AKIA6A6KCUVZEETX3SF4",
  secretAccessKey: "XYFTUIb+zHi9HAemm50/b+tHaOme2aI8kKjx0Uy9",
  region: "ap-south-1" // or your bucket region
});

const s3 = new AWS.S3();
const BUCKET_NAME = "omkarbuket"; // change to your bucket name

// Handle POST request from the form
app.post("/submit", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const fileName = `contact_${uuidv4()}.json`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: JSON.stringify({ name, email, phone, message }),
    ContentType: "application/json"
  };

  try {
    await s3.upload(params).promise();
    res.status(200).send("✅ Data saved to S3 successfully");
  } catch (error) {
    console.error("❌ Error saving to S3:", error);
    res.status(500).send("Error saving data to S3");
  }
});

// Serve static files (CSS, JS, Images)
app.use("/Style", express.static(path.join(__dirname, "public", "Style")));
app.use("/Javascript", express.static(path.join(__dirname, "public", "Javascript")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "game.html"));
});

app.get("/learn", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Learn.html"));
});

app.get("/speech_to_sign", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "speech_to_sign.html"));
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Test.html"));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
