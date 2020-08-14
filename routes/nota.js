import express from "express";
const router = express.Router();
import Nota from "../models/Nota";

router.post("/nota", async (req, res) => {
  const body = req.body;
  try {
    const notaDB = await Nota.create(body);
    return res.status(201).json(notaDB);
  } catch (err) {
    return res.status(404).json({
      message: "Error del servidor",
      err,
    });
  }
});
router.get("/nota", async (req, res) => {
  try {
    const notaDB = await Nota.find();
    res.status(200).json(notaDB);
  } catch (err) {
    res.status(500).json({
      message: "No se encontraron los datos",
      err,
    });
  }
});
router.get("/nota/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Nota.findOne({ _id });
    res.status(200).json(notaDB);
  } catch (err) {
    return res.status(400).json({
      message: "Error en la peticion",
      err,
    });
  }
});

router.delete("/nota/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Nota.findByIdAndDelete({ _id });
    res.status(200).json(notaDB);
  } catch (err) {
    res.status(400).json({
      message: "Ocurrio el error al eliminar",
      err,
    });
  }
});

router.put("/nota/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDB = await Nota.findByIdAndUpdate(_id, body, { new: true });
    res.status(202).json(notaDB);
  } catch (err) {
    res.status(500).json({
      message: "Ocurrio un error al actualizar",
      err,
    });
  }
});

export default router;
