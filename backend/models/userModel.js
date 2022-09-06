// mongodb'nin mongoose kütüphanesini sayfaya dahil et
const mongoose = require("mongoose");
// şifreleme işlemleri için bcrypt kütüphanesini sayfaya dahil et
const bcrypt = require("bcrypt");
// zorunlu alanları vurgulamak için validator kütüphanesini dahil et
const validator = require("validator");

// mongoose kütüphanesinin içindeki şema'yı kullanarak sabit oluştur
const Schema = mongoose.Schema;

// yeni bir şema mirasla
const userSchema = new Schema({
  // epostayı; metinsel, zorunlu alan ve benzersiz olarak tanımla
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // şifreyi; metinsel ve zorunlu olarak tanımla
  password: {
    type: String,
    required: true,
  },
});

// asenkron çalışan statik kayıt olma fonksiyonu
userSchema.statics.signup = async function (email, password) {
  // e-posta ve şifre boşsa hata yakala
  if (!email || !password) {
    throw Error("Tüm alanlar doldurulmalıdır!");
  }
  // validator kütüphanesinde tanımlı method ile e-posta'nın
  // geçerli olup olmadığını kontrol et
  if (!validator.isEmail(email)) {
    throw Error("E-posta geçerli değil!");
  }
  // şifrem,m oluşturma kurallarına uyup uymadığını kontrol et
  if (!validator.isStrongPassword(password)) {
    throw Error("Şifre yeterince güçlü değil!");
  }
  // e-posta'nın veritabanında olup olmadığını kontrol et
  const exists = await this.findOne({ email });
  // eğer e-posta mevcutsa hata göster
  if (exists) {
    throw Error("E-posta zaten kullanımda!");
  }
  // güvenlik amaçlı şifre tuzlandı
  const salt = await bcrypt.genSalt(10);
  // tuzlanan şifre çözülememesi için hash'lendi
  const hash = await bcrypt.hash(password, salt);
  // e-posta ve şifre doğruysa kullanıcıyı oluştur
  const user = await this.create({ email, password: hash });
  // kullanıcıya ait bilgileri geri döndür
  return user;
};

// asenkron çalışan statik giriş yapma fonksiyonu
userSchema.statics.login = async function (email, password) {
  // e-posta ve şifre boşsa hta fırlat
  if (!email || !password) {
    throw Error("Tüm alanlar doldurulmalıdır!");
  }
  // e-posta'nın veritabanında olup olmadığını kontrol et
  const user = await this.findOne({ email });
  // veritabanında kullanıcı e-postası bulunamazsa hata fırlat
  if (!user) {
    throw Error("Yanlış e-posta!");
  }
  // görnderilen şifre veritabanındaki şifreyle aynı mı eşleştir
  const match = await bcrypt.compare(password, user.password);
  // eğer şifreler uyuşmuyorsa hata fırlat
  if (!match) {
    throw Error("yanlış şifre");
  }
  // herhangi bir sorun yoksa kullanıcı girişine izin ver
  return user;
};

// diğer sayfalarda kullanabilmek için kullanıcı şemasını dışa aktar
module.exports = mongoose.model("User", userSchema);
