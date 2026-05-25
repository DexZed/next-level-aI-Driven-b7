"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssueHandler = exports.updateIssueHandler = exports.getOneIssues = exports.getAllIssues = exports.postIssue = void 0;
const IssueModel_1 = require("../../db/IssueModel");
const UserModel_1 = require("../../db/UserModel");
const HttpException_1 = require("../../errors/HttpException");
const utilities_1 = __importDefault(require("../../utils/utilities"));
exports.postIssue = (0, utilities_1.default)(async (req, res) => {
    const { title, description, type } = req.body;
    const user = req.user;
    if (!title || !description || !type) {
        return new HttpException_1.BadRequestException("Invalid issue data");
    }
    const result = await (0, IssueModel_1.createIssue)({
        title,
        description,
        type,
        reporter_id: user?.id,
    });
    res.json({
        success: true,
        message: "Issue created successfully",
        data: result,
    });
});
exports.getAllIssues = (0, utilities_1.default)(async (req, res) => {
    const { sort, type, status } = req.query;
    const queryParams = {
        sort: sort ? String(sort) : undefined,
        type: type ? String(type) : undefined,
        status: status ? String(status) : undefined,
    };
    const issues = await (0, IssueModel_1.getIssues)(queryParams);
    const reporterIds = Array.from(new Set(issues.map((issue) => issue.reporter_id).filter(Boolean)));
    const users = await (0, UserModel_1.findUsersByIds)(reporterIds);
    const userMap = new Map(users.map(user => [user.id, user]));
    const formattedData = issues.map((issue) => {
        const reporter = userMap.get(issue.reporter_id) || null;
        const { reporter_id, ...issueDetails } = issue;
        return {
            ...issueDetails,
            reporter: reporter
                ? {
                    id: reporter.id,
                    name: reporter.name,
                    role: reporter.role,
                }
                : null,
        };
    });
    return res.json({
        success: true,
        data: formattedData,
    });
});
exports.getOneIssues = (0, utilities_1.default)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return new HttpException_1.BadRequestException("Invalid issue id");
    }
    const result = await (0, IssueModel_1.getIssueById)(Number(id));
    if (!result) {
        return new HttpException_1.NotFoundException("Issue not found");
    }
    res.json({
        success: true,
        message: "Data fetched successfully",
        data: result,
    });
});
exports.updateIssueHandler = (0, utilities_1.default)(async (req, res) => {
    const id = Number(req.params.id);
    const { title, description, type } = req.body;
    const user = req.user;
    if (!title || !description || !type) {
        return new HttpException_1.BadRequestException("Invalid issue data");
    }
    const existingIssue = await (0, IssueModel_1.getIssueById)(id);
    if (!existingIssue) {
        throw new HttpException_1.NotFoundException("Issue not found");
    }
    const isMaintainer = user?.role === "maintainer";
    const isOwner = existingIssue.reporter_id === user?.id;
    const isOpen = existingIssue.status === "open";
    const isAllowedContributor = user?.role === "contributor" && isOwner && isOpen;
    if (!isMaintainer && !isAllowedContributor) {
        throw new HttpException_1.ForbiddenException("You do not have permission to update this issue. Contributors can only edit their own open issues.");
    }
    const updatedIssue = await (0, IssueModel_1.updateIssue)(id, { title, description, type });
    return res.json({
        success: true,
        message: "Issue updated successfully",
        data: updatedIssue,
    });
});
exports.deleteIssueHandler = (0, utilities_1.default)(async (req, res) => {
    const id = Number(req.params.id);
    const user = req.user;
    if (!id) {
        return new HttpException_1.BadRequestException("Invalid issue id");
    }
    if (user?.role === "contributor") {
        return res.status(403).json({
            success: false,
            message: "You do not have permission to delete this issue.",
        });
    }
    const result = await (0, IssueModel_1.deleteIssue)(id);
    res.json({
        success: true,
        message: "Issue deleted successfully",
        data: result,
    });
});
//# sourceMappingURL=issues.service.js.map