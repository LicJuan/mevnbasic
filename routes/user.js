import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
const router = express.Router();
import { authentication, verificarAdmin } from "../middlewares/auth";

const _ = require("underscore");

router.post("/user", async (req, res) => {
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
  };
  body.pass = bcrypt.hashSync(req.body.pass, 10);
  try {
    const userDB = await User.create(body);
    return res.status(201).json(userDB);
  } catch (err) {
    return res.status(500).json({
      message: "Ocurrio un error",
      err,
    });
  }
});
router.put("/user/:id", [authentication, verificarAdmin], async (req, res) => {
  const _id = req.params.id;
  const body = _.pick(req.body, ["nombre", "email", "pass", "activo"]);
  if (body.pass) {
    body.pass = bcrypt.hashSync(req.body.pass, 10);
  }
  try {
    const userDB = await User.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(userDB);
  } catch (err) {
    return res.status(400).json({
      message: "Error en la peticion",
      err,
    });
  }
});
export default router;
