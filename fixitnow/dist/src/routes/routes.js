import publicRouter from "../modules/public/publicController";
import authRouter from "../modules/auth/authController";
const routes = [
    { path: "/", controller: publicRouter },
    { path: "/api/auth", controller: authRouter },
];
export default routes;
//# sourceMappingURL=routes.js.map