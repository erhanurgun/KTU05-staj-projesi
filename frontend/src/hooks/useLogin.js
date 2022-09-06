// react bileşenlerini içeri aktar
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// giriş işlemlerini dışa aktar
export const useLogin = () => {
  // hataları yakala ve gönder
  const [error, setError] = useState(null);
  // yüklenme durumunu yakala ve gönder
  const [isLoading, setIsLoading] = useState(null);
  // yönlendirme değerininin içeriğini al
  const { dispatch } = useAuthContext();

  // asenkron olarak giriş işlemlerini yap
  const login = async (email, password) => {
    // giriş kontrolü yapılırken yüklenme durumunu aktif et
    setIsLoading(true);
    // atanan hata değerlerini sıfırla
    setError(null);
    // kullanıcı giriş işleminde e-posta ve şifre değerlerini
    // gizli olarak gönder
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // sonucu json formatında geri döndür
    const json = await response.json();
    // eğer sonuç durumu onaylanmazsa
    if (!response.ok) {
      setIsLoading(false);  // yüklenme durumunu pasif yap
      setError(json.error); // hataları gönder
    }
    // eğer sonuç durumu onaylanırsa
    if (response.ok) {
      // kullanıcıyı yerel depolamaya kaydet
      localStorage.setItem("user", JSON.stringify(json));
      // giriş işlemini güncelle
      dispatch({ type: "LOGIN", payload: json });
      // yüklenme durumunu pasif yap
      setIsLoading(false);
    }
  };
  // giriş, yüklenme ve hata bileşenlerini döndür
  return { login, isLoading, error };
};
