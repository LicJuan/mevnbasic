import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  nombre: {
    type: String,
    // required: [true, "El campo es requerido"],
  },
  descripcion: String,
  userId: String,
  date: {
    type: Date,
    default: Date.now,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model("notas", notaSchema);
