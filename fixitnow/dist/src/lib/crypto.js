import bcrypt from "bcrypt";
import { env } from "../env";
import jwt from "jsonwebtoken";
export function hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, env.BCRYPT_SALT_ROUNDS);
    return hashedPassword;
}
export async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
export function generateAccessToken(user) {
    const token = jwt.sign(user, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    });
    return token;
}
export function generateRefreshToken(user) {
    const token = jwt.sign(user, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
    return token;
}
export function verifyAccessToken(token) {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    return decoded;
}
//# sourceMappingURL=crypto.js.map