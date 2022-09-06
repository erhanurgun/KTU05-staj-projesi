// express kütüphanesini sayfaya dahil et
const express = require("express");
// kontroller içindeki giriş ve kayıt fonksiyonlarını saydaya dahil et
const { loginUser, signupUser } = require("../controllers/userController");
// express içindeki router methodunu sabite ata
const router = express.Router();
// giriş işleminin hangi adresten yapılacağını ayarla
router.post("/login", loginUser);
// kayıt işleminin hangi adresten yapılacağını ayarla
router.post("/signup", signupUser);
// diğer sayfalarda kullanılabilmesi için dışa aktar
module.exports = router;
