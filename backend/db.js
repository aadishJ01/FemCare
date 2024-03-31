const mongoose = require("mongoose");

const url =
  "mongodb+srv://aj-admin:ajadminpassword@cluster0.q5zcnx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};
