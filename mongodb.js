const mongoose = require("mongoose");

const connectdb = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch(console.error);

module.exports = connectdb;
