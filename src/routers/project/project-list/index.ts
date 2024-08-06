import { Request, Response } from "express";
import {
  checkEmailUIDExists,
  checkProjectExists,
  getProjectListByUser,
} from "../../../lib/firebase-func";

export default async function ProjectListHandler(
  req: Request<{ projectId: string; userId: string }>,
  res: Response
) {
  const { userId, projectId } = req.params;
  if (!userId || !projectId) {
    return res.status(404).json({
      status: "fail",
      message: "missing userId or projectId",
      feat: "delete project",
    });
  }

  if (!(await checkEmailUIDExists(userId))) {
    return res
      .status(409)
      .json({ status: "fail", error: "user doesn't exists!" });
  }

  if (!(await checkProjectExists(userId, projectId))) {
    return res
      .status(409)
      .json({ status: "fail", error: "project doesn't exists!" });
  }

  try {
    const data = await getProjectListByUser(userId);
    return res.status(200).json({
      status: "success",
      message: "yeyyyy",
      feat: "project info",
      data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
      message: "something wrong!!!",
      feat: "project info",
      error,
    });
  }
}
