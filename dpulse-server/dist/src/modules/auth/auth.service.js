"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.logout = exports.login = exports.register = void 0;
const UserModel_1 = require("../../db/UserModel");
const utilities_1 = __importStar(require("../../utils/utilities"));
exports.register = (0, utilities_1.default)(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid user data" });
    }
    const hashedPassword = (0, utilities_1.hashPassword)(password);
    const newUser = await (0, UserModel_1.createUser)({
        name,
        email,
        password: hashedPassword,
        role,
    });
    return res.json({
        success: true,
        message: "User registered successfully",
        data: newUser,
    });
});
exports.login = (0, utilities_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Email and password are required." });
    }
    const user = await (0, UserModel_1.findUserByEmail)(email);
    if (!user || !(0, utilities_1.comparePassword)(password, user.password)) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
    }
    const token = (0, utilities_1.generateToken)({
        id: user.id,
        name: user.name,
        role: user.role,
    });
    return res.json({
        success: true,
        message: "Login successful",
        data: { token, user },
    });
});
exports.logout = (0, utilities_1.default)(async (req, res) => {
    res.json({
        success: true,
        message: "from logout",
        data: req.body,
    });
});
exports.refresh = (0, utilities_1.default)(async (req, res) => {
    res.json({
        success: true,
        message: "from refresh",
        data: req.body,
    });
});
//# sourceMappingURL=auth.service.js.map