// react bileşenlerini sayfaya dahil et
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// antrenman bileşenlerini sayfaya dahil et
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// antrenman panelini oluştur
const Home = () => {
  // antrenmanları ve yönlendirmeyi kullanıma ayarla
  const { workouts, dispatch } = useWorkoutsContext();
  // kullanıcı bilgisini al
  const { user } = useAuthContext();

  // token bilgisiyle beraber işlem yaptırma
  useEffect(() => {
    // asenkron bir şekilde token değeriyle beraber verileri ilet
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // sonuçları json formatondaki json sabitine aktar
      const json = await response.json();
      // sonuö durumunda herhangi bir hata yoksa
      if (response.ok) {
        // ekleme işlemlerine yönlendir
        dispatch({
          type: "SET_WORKOUTS",
          payload: json,
        });
      }
    };
    // kullanıcı bilgisi varsa antrenmanları listele
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // antrenmanların iskelet yapısı
  return (
    <div className="home">
      <div className="workouts">
        {/* antrenmanlar varsa listele */}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

// antrenman panelini dışarı aktar
export default Home;
