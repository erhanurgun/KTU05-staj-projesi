// express kütüphanesini sayfaya dahil et
const express = require("express");
// kontrollerden oluşturma, okuma, silme ve güncelleme işlemlerini al
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
// güvenlik doğrulaması için ara katmandan doğrulamayı sabite al
const requireAuth = require("../middleware/requireAuth");

// tüm egzersiz rotaları için yetkilendirme gerekli
const router = express.Router();
// doğrulamayı kullan
router.use(requireAuth);

// tüm antrenmanları getir
router.get("/", getWorkouts);

// sadece id'si verilen antrenmanı getir
router.get("/:id", getWorkout);

// yeni antrenman oluştur
router.post("/", createWorkout);

// id değeri verilen antrenmanı sil
router.delete("/:id", deleteWorkout);

// id değeri verilen antrenmanı güncelle
router.patch("/:id", updateWorkout);

// başka sayfalardan kullanılabilmesi için dışa aktar
module.exports = router;
