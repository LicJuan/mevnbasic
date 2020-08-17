import jwt from "jsonwebtoken";
const authentication = (req, res, next) => {
  const token = req.get("token");
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.status(400).json({
        message: "Usuario no valido",
      });
    }
    req.user = decoded.data;
    next();
  });
};

const verificarAdmin = (req, res, next) => {
  const role = req.user.role;
  if (role === "ADMIN") {
    next();
  } else {
    res.status(401).json({
      message: "Usuario No valido",
    });
  }
};

module.exports = { authentication, verificarAdmin };
