const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const connectdb = require("./mongodb");

const todoRoute = require("./routes/todoRoute");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", todoRoute);

// Your code
// if (process.env.NODE_ENV === "production") {
//   const path = require("path");
//   app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
//   app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'),function (err) {
//           if(err) {
//               res.status(500).send(err)
//           }
//       });
//   })
// }
// Your code


connectdb();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
