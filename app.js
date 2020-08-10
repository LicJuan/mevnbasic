import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
// Morgan permite visualizar en la consola las peticiones http que se realizan
import morgan from "morgan";
// Cors permite realizar peticiones http desde otros dominios
import cors from "cors";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express framework");
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
