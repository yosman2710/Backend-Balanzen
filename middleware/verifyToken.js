import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("🔐 Header recibido:", authHeader);
    if (!authHeader) {
        console.log("⛔ Token ausente");
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    console.log("📦 Token extraído:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token válido:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("❌ Token inválido:", err.message);
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};
