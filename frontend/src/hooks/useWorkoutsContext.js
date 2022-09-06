// react bileşenlerini sayfaya dahil et
import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

// antrenman içeriğini kullanmak için dışa aktarma isteği
export const useWorkoutsContext = () => {
  // içeriği al
  const context = useContext(WorkoutsContext);
  // eğer içerik değeri yoksa hata fırlat
  if (!context) {
    throw Error(
      "useWorkoutsContext, bir WorkoutsContextProvider içinde kullanılmalıdır"
    );
  }

  return context;
};
