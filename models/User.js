import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;

const roles = {
  values: ["ADMIN", "USER"],
  message: "{VALUES} no es valido",
};

const userSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El password es requerido"],
  },
  email: {
    type: String,
    required: [true, "El password es requerido"],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, "El password es requerido"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "USER",
    enum: roles,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

userSchema.plugin(uniqueValidator, {
  message: "Error, El campo {PATH} ya ha sido registrado",
});

userSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["pass"];
    return ret;
  },
});
const User = mongoose.model("users", userSchema);

export default User;
