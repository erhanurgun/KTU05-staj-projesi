// to do için oluşturulan modeli içeri aktar
const Workout = require("../models/workoutModel");
// mongodb için mongoose kütüphanesini içe aktar
const mongoose = require("mongoose");

// tüm egzersizleri getirtme fonksiyonu
const getWorkouts = async (req, res) => {
  // istek yapılan kullanıcının id'sini al
  const user_id = req.user._id;
  /* oluşturma tarihine göre tersten sıralayarak kullanıcı
     id'sine göre veri ara 
   */
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  // geri dönen yanıtın durum kodu 200 ise bu egzersizi json formatında döndür
  res.status(200).json(workouts);
};

// id parametresine göre veri gertirme fonksiyonu
const getWorkout = async (req, res) => {
  // parametre olarak gönderilen id değerini al
  const { id } = req.params;
  // eğer id parametresi yoksa
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // durum kodu 404 için bir hata mesajı döndür
    return res.status(404).json({ error: "Böyle bir antrenman bulunamadı" });
  }
  // id değerine göre antrenman bul
  const workout = await Workout.findById(id);
  // eğer antrenman sabitinin değeri yoksa
  if (!workout) {
    // durum kodu 404 için bir hata mesajı döndür
    return res.status(404).json({ error: "Böyle bir antrenman bulunamadı" });
  }
  // durum kodu 200 için antrenmanı gönder
  res.status(200).json(workout);
};

// asenkron çalışan yeni antrenman oluşturma fonksiyonu
const createWorkout = async (req, res) => {
  // başlık, yüklenme ve tekrar değerlerini gövdeden al
  const { title, load, reps } = req.body;
  // boş alanlar için boş bir dizi değişkeni oluştur
  let emptyFields = [];
  // eğer başlık değeri yoksa
  if (!title) {
    // diziye başlık adında bir eleman ata
    emptyFields.push("title");
  }
  // eğer yüklenme değeri yoksa
  if (!load) {
    // diziye yüklenme adında bir eleman ata
    emptyFields.push("load");
  }
  // eğer tekrar değeri yoksa
  if (!reps) {
    // diziye tekrar adında bir eleman ata
    emptyFields.push("reps");
  }
  // dizinin içinde en az bir eleman varsa
  // (yani boş değer bırakılmışsa)
  if (emptyFields.length > 0) {
    // durum kodu 400 olan bir uyarı mesajını geriye döndür
    return res
      .status(400)
      .json({ error: "Tüm alanları eksiksiz doldurunuz!", emptyFields });
  }

  // verileri mongodb atlas veritabanına yazdır
  try {
    // kullanıcı id'sini al
    const user_id = req.user._id;
    // gönderilen parametre değerlerine göre yeni antrenman oluştur
    const workout = await Workout.create({ title, load, reps, user_id });
    // durum kodu 200 ise (yani hata yoksa) antrenmanı json olarak döndür
    res.status(200).json(workout);
  } catch (error) {
    // hata oluşursa 400 durum koduyla hatayı json olarak yazdır
    res.status(400).json({ error: error.message });
  }
};

// asenkron olarak antrenman silme fonksiyonu
const deleteWorkout = async (req, res) => {
  // id değerini istek yapılam parametrelerden al
  const { id } = req.params;
  // eğer id değeri yoksa
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // 404 durum koduna hata ilet
    return res.status(404).json({ error: "Böyle bir antrenman bulunamadı" });
  }
  // mongodb atlastaki id'ye silmek istenilen id değeri iletildi
  const workout = await Workout.findOneAndDelete({ _id: id });
  // eğer böyle bir veri bulunamazsa
  if (!workout) {
    // 404 durum koduna hata ilet
    return res.status(404).json({ error: "Böyle bir antrenman bulunamadı" });
  }
  // eğer herşey yolundaysa 200 durum koduna filtrelenen antrenmanı silmek için ilet
  res.status(200).json(workout);
};

// asenkron çalışan antrenman silme fonksiyonu
const updateWorkout = async (req, res) => {
  // parametrelerden id değerini al
  const { id } = req.params;
  // eğer id değerinde bir antrenman bulunamazsa
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // 404 durum koduna hata ilet
    return res.status(404).json({ error: "Böyle bir antrenman bulunamadı" });
  }
  // güncellenmek istenen antrenmanın id değeri ve değiştirilecek içerik iletilir
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  // eğer antrenman bulunamazsa
  if (!workout) {
    // 404 durum koduna hata ilet
    return res.status(404).json({ error: "Böyle bir antrenman bulunamadı" });
  }
  // eğer herşey yolundaysa günceleme talebini 200 durum kodu vasıtasıyla ilet
  res.status(200).json(workout);
};
// oluşturulan fonksiyonların diğer sayfalarda da kullanılabilmesi için dışa aktarıldı
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
