import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
// Morgan permite visualizar en la consola las peticiones http que se realizan
import morgan from "morgan";
// Cors permite realizar peticiones http desde otros dominios
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import routes from "./routes/nota";
import history from "connect-history-api-fallback";

const URI =
  "mongodb+srv://intro-master:JRDG05180913@intronode-7sskn.mongodb.net/mevnbasic?retryWrites=true&w=majority";
// Conexion a db
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(history());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
