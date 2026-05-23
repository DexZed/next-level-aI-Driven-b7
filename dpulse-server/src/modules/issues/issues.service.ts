import type { Request, Response } from "express";
import asyncHandler from "../../utils/utilities";
import type { RequestExtended } from "../../types";
import { createIssue, getIssues } from "../../db/IssueModel";
import { findUserByEmail } from "../../db/UserModel";

export const postIssue = asyncHandler(
  async (req: RequestExtended, res: Response) => {
    const { title, description, type } = req.body;
    const user = req.user;

    if (!title || !description || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid issue data" });
    }
    const result = await createIssue({
      title: title,
      description: description,
      type: type,
      reporter_id: user?.id,
    });
    res.json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  },
);

export async function getAllIssues(req: RequestExtended, res: Response) {
  const { sort, type, status } = req.query;
  const user = req.user;
  const queryParams = {
    sort: String(sort || ""),
    type: String(type || ""),
    status: String(status || ""),
  };
  const issues = await getIssues(queryParams);
  const reporterData = await findUserByEmail(user?.email);
  
  res.json({
    success: true,
    message: "from getIssues",
    data: req.body + "Query Params: " + sort + type + status,
  });
}

export async function getIssue(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from getIssue",
    data: req.body,
  });
}

export async function updateIssue(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from updateIssue",
    data: req.body,
  });
}

export async function deleteIssue(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from deleteIssue",
    data: req.body,
  });
}
