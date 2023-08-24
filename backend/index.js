const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const connectdb = require("./mongodb");

const todoRoute = require("./routes/todoRoute");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

connectdb();

app.use("/api", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
