const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// kullanici kayit register

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // kullanici daha once kayit olmusmu
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "bu email zaten kayitli" });
    }
    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // new user create
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Kayit basarili" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatasi" });
  }
};

// user login

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // kullanici varmi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: " Gecersiz email veya sifre" });
    }
    // sifre dogru mu ?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Gecersiz email veya sifre" });
    }

    // JWT token create
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Giris basarili.",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatasi" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Token'ı alalım
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrulama

    // Kullanıcıyı bulalım

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).send({ error: "Kullanıcı bulunamadı" });
    }

    // Kullanıcı bilgilerini döndür
    res.status(200).send({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Profil verisi alınırken hata oluştu:", error); // Detaylı hata mesajı
    res.status(500).send({ error: "Profil verisi alınırken hata oluştu" });
  }
};

module.exports = { register, login, getUserProfile };
