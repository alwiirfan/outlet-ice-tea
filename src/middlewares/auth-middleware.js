import "dotenv/config";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({ status: 403, message: "Forbidden" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id;
    req.username = decoded.username;
    req.email = decoded.email;
    req.role = decoded.role;
    req.sub = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};

const verifyTokenCashier = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token = {}", token);

  if (!token)
    return res.status(403).json({ status: 403, message: "Forbidden" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    if (decoded.role !== "CASHIER") {
      return res
        .status(401)
        .json({ status: 401, message: "you are not authorized" });
    }

    req.id = decoded.id;
    req.username = decoded.username;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};

const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({ status: 403, message: "Forbidden" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return res
        .status(401)
        .json({ status: 401, message: "you are not authorized" });
    }

    req.id = decoded.id;
    req.username = decoded.username;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
};

export { verifyToken, verifyTokenCashier, verifyTokenAdmin };
