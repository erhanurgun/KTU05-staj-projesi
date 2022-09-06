// gerekli kütüphane ve kancalar sayfaya dahil edildi
import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// antrenman formu için 
const WorkoutForm = () => {
  // yollanacak adres sabiti
  const { dispatch } = useWorkoutsContext();
  // kullanıcı bilgileri
  const { user } = useAuthContext();
  // eklenecek başlık, yüklenme, tekrar sayısı
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  // gösterilecek hata ve boş dizi
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // asenkron çalışan antrenman ekle butonuna tıklandığında
  const handleSubmit = async (e) => {
    // formun varsayılan gönderme işlevini devredışı bırak
    e.preventDefault();
    // eğer kullanıcı giriş yapmamışsa hata ver
    if (!user) {
      setError("Önce giriş yapmalısınız!");
      return;
    }
    // başlık, yüklenme, tekrar bilgilerini al
    const workout = { title, load, reps };
    // api'ye bir asenkton istek gerçekleştirildiğinde
    const response = await fetch("/api/workouts", {
      // token ile beraber antrenman içeriğini gizli bir şekilde ilet
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    // sonucu json formatında sabite ata
    const json = await response.json();
    // eğer sonuç durumu tamam değilse
    if (!response.ok) {
      // hatayı ekrana bastır
      setError(json.error);
      // bos alan değerini json olarak al
      setEmptyFields(json.emptyFields);
    }
    // eğer durum tamamsa
    if (response.ok) {
      // başlık, yüklenme, tekrar, hata ve dizi değerini sıfırla
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      // konsol ekranına ekleme işleminin başarılı oldığunu yaz
      console.log("yeni antrenman eklendi", json);
      // ekleme işlemi alanına yönlendir
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  // antrenman formunun iskelet yapısı
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Yeni Antrenman Ekle</h3>

      <label>Başlık:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="başlık giriniz..."
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Yüklenme:</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        placeholder="yüklenme sayısını giriniz..."
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Tekrar:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        placeholder="tekrar sayısını giriniz..."
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Antrenmanı Ekle</button>
      {/* eğer hata varsa hatayı göster */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

// diğer sayfalarda kullanabilmek için dışa aktar
export default WorkoutForm;
