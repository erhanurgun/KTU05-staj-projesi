// react konponentleri sayfaya dahil edildi
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// giriş işlemi için bir fpnksiyon oluşturulup dışa aktarıldı
export const useSignup = () => {
  // hatayı gösterme ve ekleme ayarlandı
  const [error, setError] = useState(null);
  // yüklenmeyi gösterme ve eklemesi ayarlandı
  const [isLoading, setIsLoading] = useState(null);
  // yönlendirme sabiti ayarlandı
  const { dispatch } = useAuthContext();

  // giriş işlemi yapılmak istendiğinde
  const signup = async (email, password) => {
    setIsLoading(true);   // yüklenme durumunu aktifleştir
    setError(null);       // hata durumunu temizle

    // giriş isteğini api aracılığıyla yönlendir
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // dönen durum bilgisini jsona çevir
    const json = await response.json();
    // sonuç değeri boşsa
    if (!response.ok) {
      setIsLoading(false);    // yüklenme durumunu pasif et
      setError(json.error);   // hatayı gönder
    }
    // sonuç durumu tamamsa / hata yoksa
    if (response.ok) {
      // kullanıcıyı yerel depolamaya kaydet
      localStorage.setItem("user", JSON.stringify(json));
      // giriş bağlamını güncelle
      dispatch({ type: "LOGIN", payload: json });
      // yüklenme durumunu pasif yap
      setIsLoading(false);
    }
  };
  // giriş yüklenme ve hata durumunu geriye döndür
  return { signup, isLoading, error };
};
