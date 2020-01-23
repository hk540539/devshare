const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("tiny"));
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

// connect Database
connectDB();

// define routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const post = require("./routes/api/post");
const profile = require("./routes/api/profile");

// Define Routes
app.get("/", (req, res) => {
  res.json({ msg: "hola" });
});
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api/profile", profile);

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
