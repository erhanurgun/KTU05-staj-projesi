// react bileşenlerini sayfaya dahil et
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

// çıkış fonksiyonu yarat ve dışa aktar
export const useLogout = () => {
  // antrenman kullanımını yenile
  const { dispatch } = useAuthContext();
  // antrenman durumunu çakıştığı için yeniden adlandırarak gönder
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  // çıkış fonksiyonu açlıştığında
  const logout = () => {
    // kullanıcı bilgisini depodan temizle
    localStorage.removeItem("user");
    // çıkış işlemini gönder
    dispatch({ type: "LOGOUT" });
    // eklenme işleminde ki durum bilgisine izin verme
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  // çıkış işlemlerini geri döndür
  return { logout };
};
