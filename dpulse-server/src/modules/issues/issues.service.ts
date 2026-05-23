import type { Request, Response } from "express";
import asyncHandler from "../../utils/utilities";
import type { RequestExtended } from "../../types";

export const createIssue = asyncHandler(async (req: RequestExtended, res: Response) => {
  
    const {title, description, type} = req.body;
    const user= req.user;
    
    if (!title || !description || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid issue data" });
    }
    
    
    res.json({
    success: true,
    message: "from createIssue",
    data: req.body,
  });
});

export async function getIssues(req: Request, res: Response) {
  const { sort, type, status } = req.query;
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
