import express from "express";
const router = express.Router();
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.get("/", async (req, res) => {
  return res.json({
    message: "Vista de Login",
  });
});
router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const userDB = await User.findOne({ email: body.email });
    if (!userDB) {
      return res.status(400).json({
        message: "El email no coincide",
      });
    }
    if (!bcrypt.compareSync(body.pass, userDB.pass)) {
      return res.status(400).json({
        message: "Password incorrecto",
      });
    }
    const token = jwt.sign(
      {
        data: userDB,
      },
      "secret",
      { expiresIn: 60 * 60 * 24 * 30 }
    );

    res.json({
      userDB,
      token,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Ocurrio un error",
      err,
    });
  }
});

export default router;
