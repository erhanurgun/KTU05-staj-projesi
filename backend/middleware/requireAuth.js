// güvenlikte kullanmak için jwt sayfaya dahil edildi
const jwt = require("jsonwebtoken");
// kullanıcı modeli sayfaya dahil edildi
const User = require("../models/userModel");

// asenkron çalışan kimlik doğrulama fonksiyonu
const requireAuth = async (req, res, next) => {
  // kimlik doğrulama token değeri okundu
  const { authorization } = req.headers;
  // eğer gelen token değeri bulunamazsa
  if (!authorization) {
    // 401 erişim sorunu durum koduyla hata ver
    return res.status(401).json({ error: "Yetkilendirme jetonu gerekli" });
  }
  // token gelen token değerini boştuk'tan parçalla
  const token = authorization.split(" ")[1];
  // doğrulamayı dene
  try {
    // token içindeki şifre değeri env dosyasındaki gizli şifreyle eşleşiyorsa al
    const { _id } = jwt.verify(token, process.env.SECRET);
    // id değerine göre kullanıcıyı bul
    req.user = await User.findOne({ _id }).select("_id");
    // devam et
    next();
  } catch (error) {
    // hata oluşursa hatayı konsol ekranına yazdır
    console.log(error);
    // 401 erişim sorunu durum koduyla hata ver
    res.status(401).json({ error: "Yetkilendirme jetonu gerekli" });
  }
};

// diğer sayfalarda kullanılabilmesi için fonksiyonu dışa aktar
module.exports = requireAuth;
