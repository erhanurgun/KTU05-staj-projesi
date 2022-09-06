// mongodb'nin mongoose kütüphanesini sayfaya dahil et
const mongoose = require("mongoose");
// mongoose kütüphanesinin içindeki şema'yı kullanarak sabit oluştur
const Schema = mongoose.Schema;
// yeni bir şema mirasla
const workoutSchema = new Schema(
  {
    // başlığı, metinsel türde ve zorunlu alan olarak ayarla
    title: {
      type: String,
      required: true,
    },
    // tekrarı, sayısal türde ve zorunlu alan olarak ayarla
    reps: {
      type: Number,
      required: true,
    },
    // yüklenmeyi, sayısal türde ve zorunlu alan olarak ayarla
    load: {
      type: Number,
      required: true,
    },
    // kullanıcı kimliğini, metinsel türde ve zorunlu alan olarak ayarla
    user_id: {
      type: String,
      required: true,
    },
  },
  // zaman damgasının durumunu aktif et
  { timestamps: true }
);

// modelin diğer sayfalardan da kullanılabilmesi için dışa aktar
module.exports = mongoose.model("Workout", workoutSchema);
