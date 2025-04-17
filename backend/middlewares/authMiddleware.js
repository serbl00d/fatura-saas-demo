const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Authorization basligina bak ( ornek: Bearer token123)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkisiz. Token bulunamadi" });
  }

  // Bearer kismini cikartip tokeni birakiyoruz
  const token = authHeader.split(" ")[1];

  try {
    // tokeni dogrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanici bilgilerini request e ekle
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Gecersiz token." });
  }
};

module.exports = authMiddleware;
