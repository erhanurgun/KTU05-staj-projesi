// antrenman içeriğini kontrol etmek için dahil et
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// güvenlik işlemlerini kontrol etmek için dahil et
import { useAuthContext } from "../hooks/useAuthContext";
// tarih formatlama için eklenen kütüphane
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { tr } from "date-fns/locale";

// antrenmanların detay bilgilerini kontrol etmek için
const WorkoutDetails = ({ workout }) => {
  // içeriğin gönderilmesinde kullanılacak
  const { dispatch } = useWorkoutsContext();
  // kullanıcının giriş yapıp yapmadığının kontrolü için
  const { user } = useAuthContext();
  // işlem yapıldığında çalışacak asenkron fonksiyon
  const handleClick = async () => {
    // eğer kullanıcı yoksa işlem yapma
    if (!user) {
      return;
    }
    // silme işlemi yapılmak istendiğinde uyarı ver
    let alert = window.confirm("Silmek istediğinize emin misin?");
    // eğer tamam'a tıklanırsa
    if (alert) {
      /* ilgili api'ye token ile birlikte;
       - antrenmanın id'sini ve girişte üretilen jetonu silmek için ilgili alana ilet
       */
      const response = await fetch("/api/workouts/" + workout._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // sonucu json formatında geri döndür
      const json = await response.json();
      // eğer yanıt durumu tamasa silme işlemi için yönlendir
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    }
  };

  // antrenman detayının iskelet yapısı
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Yüklenme...: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Tekrar.........: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
          locale: tr,
        })}
      </p>
      <span className="material-symbols-outlined del" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

// diğer sayfalarda kullanabilmek için dışa aktar
export default WorkoutDetails;
