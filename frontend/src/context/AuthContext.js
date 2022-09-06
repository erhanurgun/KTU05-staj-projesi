// react kullanmak için gerekli komponentleri ekle
import { createContext, useReducer, useEffect } from "react";

// oluşturma içeriğini dışarı postala
export const AuthContext = createContext();

// yetkilendirme de giriş ve çıkış işlemleri
export const authReducer = (state, action) => {
  switch (action.type) {
    // tip değeri eğer girişse
    case "LOGIN":
      // yüklenme değerini ilet
      return { user: action.payload };
    // tip değeri eğer çıkışsa
    case "LOGOUT":
      // yüklenme değerini boş bırak
      return { user: null };
    // varsayılan olarak durum bilgisini ilet
    default:
      return state;
  }
};

// yetkilendirme bağlamı fonksiyonunu oluşturup dışa aktarma
export const AuthContextProvider = ({ children }) => {
  // doğrulama için durum ve yönlendirme tipi ataması yapıldı
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // kullanıcı bilgisi sıfırlandı
  });

  // efekt kullanma ile veri depolama yapıldı
  useEffect(() => {
    // kullanıcı bilgileri kullanıcı adındaki değişkende yedeklendi
    const user = JSON.parse(localStorage.getItem("user"));
    // eğer kullanıcı adındaki değişkende veri varsa
    if (user) {
      // kullanıcı bilgileriyle birlikte girişe yönlendir
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext durumu:", state);

  // antrenmana ait veri sağlayıcısının iskelet yapısı
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
