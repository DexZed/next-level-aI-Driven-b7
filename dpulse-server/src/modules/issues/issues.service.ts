import type { Request, Response } from "express";

import type { RequestExtended } from "../../types/index";

import {
  createIssue,
  deleteIssue,
  getIssueById,
  getIssues,
  updateIssue,
} from "../../db/IssueModel";
import { findUsersByIds } from "../../db/UserModel";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "../../errors/HttpException";
import asyncHandler from "../../utils/utilities";

export const postIssue = asyncHandler(
  async (req: RequestExtended, res: Response) => {
    const { title, description, type } = req.body;
    const user = req.user;

    if (!title || !description || !type) {
      return new BadRequestException("Invalid issue data");
    }
    const result = await createIssue({
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
  },
);

export const getAllIssues = asyncHandler(
  async (req: RequestExtended, res: Response) => {
    const { sort, type, status } = req.query;

    const queryParams = {
      sort: sort ? String(sort) : undefined,
      type: type ? String(type) : undefined,
      status: status ? String(status) : undefined,
    };

    const issues = await getIssues(queryParams);

    const reporterIds = Array.from(
      new Set(issues.map((issue: any) => issue.reporter_id).filter(Boolean)),
    );

    const users = await findUsersByIds(reporterIds as number[]);

    const userMap = new Map(users.map(user => [user.id, user]));

    const formattedData = issues.map((issue: any) => {
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
  },
);

export const getOneIssues = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return new BadRequestException("Invalid issue id");
    }

    const result = await getIssueById(Number(id));

    if (!result) {
      return new NotFoundException("Issue not found");
    }
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  },
);

export const updateIssueHandler = asyncHandler(
  async (req: RequestExtended, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, type } = req.body;
    const user = req.user;

    if (!title || !description || !type) {
      return new BadRequestException("Invalid issue data");
    }
    const existingIssue = await getIssueById(id);
    if (!existingIssue) {
      throw new NotFoundException("Issue not found");
    }
    const isMaintainer = user?.role === "maintainer";
    const isOwner = existingIssue.reporter_id === user?.id;
    const isOpen = existingIssue.status === "open";
    const isAllowedContributor
      = user?.role === "contributor" && isOwner && isOpen;

    if (!isMaintainer && !isAllowedContributor) {
      throw new ForbiddenException(
        "You do not have permission to update this issue. Contributors can only edit their own open issues.",
      );
    }
    const updatedIssue = await updateIssue(id, { title, description, type });
    return res.json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue,
    });
  },
);

export const deleteIssueHandler = asyncHandler(
  async (req: RequestExtended, res: Response) => {
    const id = Number(req.params.id);
    const user = req.user;
    if (!id) {
      return new BadRequestException("Invalid issue id");
    }

    if (user?.role === "contributor") {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this issue.",
      });
    }

    const result = await deleteIssue(id);

    res.json({
      success: true,
      message: "Issue deleted successfully",
      data: result,
    });
  },
);
