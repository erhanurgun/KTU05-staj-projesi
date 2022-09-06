// react'a ait kütüphaneler sayfaya dahil edildi
import { createContext, useReducer } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// oluşturma içeriğini dışarı postala
export const WorkoutsContext = createContext();

// yapılabilecek işlemlerin durum ve aksiyon ataması yapıldu
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    // aksiyon tipi eklemeyse
    case "SET_WORKOUTS":
      return {
        // antrenman bilgisi olarak yükle
        workouts: action.payload,
      };
      // aksiyon durumu oluşturmaysa
    case "CREATE_WORKOUT":
      return {
        // geriye yüklenme ve durum bilgilerini gönder
        workouts: [action.payload, ...state.workouts],
      };
      // aksiyon durumu silmeyse
    case "DELETE_WORKOUT":
      return {
        // silmek istenen antrenmanın id değeri gönderilen değere eşit değilse al
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
      // varsayılan olarak durum bilgisini depola
    default:
      return state;
  }
};

// antrenman içeriğini yolladıktan sonra değeri sıfırlama
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

    // antrenman sağlayısıcının durum bilgilerini ve yönlendirmesini yap
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
