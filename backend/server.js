// konfigürasyon ayarlarının tutulduğu .env dosyasını dahil et 
require("dotenv").config();
// express ve mongoose kütüphanesini sayfaya dahil et
const express = require("express");
const mongoose = require("mongoose");
// kullanıcı ve antrenmanların erişim yollarını dahil et
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express'ten bir sabit oluştur
const app = express();
// middleware'i kullanabilmek için express'in içinden json kullan
app.use(express.json());
// oluşturulan express'i kullan
app.use((req, res, next) => {
  // konsol ekranına yolu ve methodu yazdır
  console.log(req.path, req.method);
  // devam et
  next();
});

// api bağlantılarının hangi yollar aracılığıyla yapılacağını ayarla
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

/* veritabanına bağlan;
 - mongodb'nin mongoose'unu kullan
 - .env dosyasının içindeki mongodb yolunu kullan
 */
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {})
  .catch((error) => {
    // hata oluşursa konsol ekranına hatayı yaz
    console.log(error);
  });

// .env dosyasında atanan port aracılığıyla express'i dinle
app.listen(process.env.PORT, () => {
  console.log("veritabanına bağlandı ve", process.env.PORT, "portu dinleniyor...");
});
