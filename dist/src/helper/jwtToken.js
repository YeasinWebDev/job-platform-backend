import jwt, {} from "jsonwebtoken";
export const generateToken = ({ email, role, expiry = "1d" }) => {
    const secret = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ email, role }, secret, {
        algorithm: "HS256",
        expiresIn: expiry,
    });
    return { accessToken: token };
};
export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, secret);
};
//# sourceMappingURL=jwtToken.js.map