// sayfalar arasında gezinmek için react dom sayfaya dahil edildi
import { Link } from "react-router-dom";
// kullanıcıya çıkış işlemi yaptırma için
import { useLogout } from "../hooks/useLogout";
// içerik yönetimi kontrolleri için
import { useAuthContext } from "../hooks/useAuthContext";

// menünü alanı için oluşturulan fonksiyon
const Navbar = () => {
  // çıkış işlemlerini yönetmek için sabit oluşturuldu
  const { logout } = useLogout();
  // içerik yönetimi için kullanıcı sabiti oluşturuldu
  const { user } = useAuthContext();
  // tıklama işlemi yapıldığında çıkış fonksiyonu çalıştırıldı
  const handleClick = () => {
    logout();
  };

  // navbar'ın iskelet yapısı 
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            <span className="title-1">TO</span>
            <span className="title-2">DO</span>
            &nbsp;Antrenmanı
          </h1>
        </Link>
        <nav>
          {/* kullanıcı giriş yapmışsa */}
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Çıkış Yap</button>
            </div>
          )}
          {/* kullanıcı giriş yapmamışsa */}
          {!user && (
            <div>
              <Link className="br-r" to="/login">Giriş Yap</Link>
              <Link to="/signup">Kaydol</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
