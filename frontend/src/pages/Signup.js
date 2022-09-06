// gerekli bileşenler sayfaya daghil edildi
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// kayıt işlemi içim
const Signup = () => {
  // e-posta bilgisi listeleme ve atama ayarlandı
  const [email, setEmail] = useState("");
  // şifre bilgisi listeleme ve atama ayarlandı
  const [password, setPassword] = useState("");
  // kayıt, hata yakalama ve yüklenme sabitleri ayarlandı
  const { signup, error, isLoading } = useSignup();

  // kaydol butonuna tıklandığında
  const handleSubmit = async (e) => {
    // varsayılan özelliklerini sıfırla
    e.preventDefault();
    // kayıt işlemlerine yönlendir
    await signup(email, password);
  };

  // kayıt yapma alanının iskelet yapısı
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Kayıt Ol</h3>

      <label>E-Posta:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="e-posta adresi giriniz..."
      />
      <label>Şifre:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="şifre giriniz..."
      />

      <button disabled={isLoading}>Kaydol</button>
      {/* eğer hata varsa ekrana yazdır */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

// kullanılabilmesi için dışa aktar
export default Signup;
