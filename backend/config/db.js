const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB baglantisi basarili");
  } catch (err) {
    console.log("MongoDB baglanti hatasi:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
