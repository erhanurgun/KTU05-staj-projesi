// react komponentlerinş ve doğrulama içeriğini dahil et
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// doğrulama içeriğini dışarı aktar
export const useAuthContext = () => {
  // içeriği sabite ata
  const context = useContext(AuthContext);
  // eğer içerik değeri yoksa hata fırlat
  if (!context) {
    throw Error(
      "useAuthContext, bir AuthContextProvider içinde kullanılmalıdır"
    );
  }
  // içeriği geri döndür
  return context;
};
