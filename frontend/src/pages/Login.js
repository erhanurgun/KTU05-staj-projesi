// gerekli bileşenler sayfaya daghil edildi
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

// giriş işlemi için
const Login = () => {
  // e-posta bilgisi listeleme ve atama ayarlandı
  const [email, setEmail] = useState("");
  // şifre bilgisi listeleme ve atama ayarlandı
  const [password, setPassword] = useState("");
  // giriş, hata yakalama ve yüklenme sabitleri ayarlandı
  const { login, error, isLoading } = useLogin();
  // giriş yap butonuna tıklandığında
  const handleSubmit = async (e) => {
    // varsayılan özelliklerini sıfırla
    e.preventDefault();
    // giriş işlemlerine yönlendir
    await login(email, password);
  };

  // giriş yapma alanının iskelet yapısı
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Giriş Yap</h3>
      <label>E-Posta:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="e-posta adresinizi giriniz..."
      />
      <label>Şifre:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="şifrenizi giriniz..."
      />

      <button disabled={isLoading}>Giriş Yap</button>
      {/* eğer hata varsa hatayı göster */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

// kullanılabilmesi için sayfayı dışa aktar
export default Login;
