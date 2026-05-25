"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_validation_1 = __importDefault(require("../../middlewares/jwt.validation"));
const issues_service_1 = require("./issues.service");
const issuesRouter = express_1.default.Router();
issuesRouter.post("/", jwt_validation_1.default, issues_service_1.postIssue);
issuesRouter.get("/", issues_service_1.getAllIssues);
issuesRouter.get("/:id", issues_service_1.getOneIssues);
issuesRouter.patch("/:id", jwt_validation_1.default, issues_service_1.updateIssueHandler);
issuesRouter.delete("/:id", jwt_validation_1.default, issues_service_1.deleteIssueHandler);
exports.default = issuesRouter;
//# sourceMappingURL=issues.controller.js.map