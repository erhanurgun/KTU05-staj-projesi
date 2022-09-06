// kullanıcı modeli sayfaya dahil et
const User = require("../models/userModel");
// güvenlik için json web token (jwt) paketini dahil et
const jwt = require("jsonwebtoken");

// token oluşturma fonksiyonu
const createToken = (_id) => {
  /* giriş için;
   - kullanıcı id'sini ve .env dosyasındaki gizli anahtarı al
     json web token'a gönder
   - jeton (token) bitiş tarihini 3 gün olarak ayarla
   */
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// asenkron çalışan kullanıcı giriş fonksiyonu
const loginUser = async (req, res) => {
  // istek (req) yapıldığında gövdeden gelen e-posta ve şifreyi al
  const { email, password } = req.body;
  // hata oluşunca yakalaması için try-catch kullan
  try {
    /* dahil edilen kullanıcı modeline e-posta ve şifre
       parametre olarak eklenip sabite akratılıdı
     */
    const user = await User.login(email, password);
    // kullanıcı id'sine göre jeton oluşturuldu
    const token = createToken(user._id);
    /* geri dönen cevap (res) durum kodu 200 ise json
       formatında e-posta ve jetonu parametre olarak gönder
     */
    res.status(200).json({ email, token });
  } catch (error) {
    // cevap durum kodu 400 ise error içinde depolanam mesajı gönder
    res.status(400).json({ error: error.message });
  }
};

// asenkron kullanıcı giriş fonksiyonu
const signupUser = async (req, res) => {
  // istek (req) yapıldığında e-posta ve şifreyi al
  const { email, password } = req.body;
  // hata oluşursa yakala
  try {
    // giriş kayıt işlemi için e-posta ve şifre gönder
    const user = await User.signup(email, password);
    // kullanıcı id'sine göre jeton oluştur
    const token = createToken(user._id);
    // durum kodu 200 ise json formatında e-posta ve şifreyi gönder
    res.status(200).json({ email, token });
  } catch (error) {
    // durum kodu 400 ise hatayı gönder
    res.status(400).json({ error: error.message });
  }
};

// başka sayfalarda kullanılabilmesi için fonksiyonları dışa aktar
module.exports = { signupUser, loginUser };
