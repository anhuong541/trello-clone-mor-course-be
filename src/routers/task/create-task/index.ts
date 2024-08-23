import { Request, Response } from "express";
import { TaskType } from "@/types";
import { createOrSetTask, getUpdateProjectDueTime } from "@/lib/firebase-func";

export default async function CreateTaskHandler(req: Request<{}, {}, TaskType, {}>, res: Response) {
  const feat = "create task"; // name api
  const taskContent = req.body;
  try {
    if (!taskContent) {
      return res.status(400).json({
        status: "fail",
        message: "require task body",
        feat,
      });
    }

    try {
      await createOrSetTask(taskContent.projectId, taskContent.taskId, taskContent);
      await getUpdateProjectDueTime(taskContent.projectId);
      return res.status(200).json({ status: "success", feat });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        feat,
        message: "something wrong when create task",
        error,
      });
    }
  } catch (error) {
    return res.status(401).json({ status: "fail", feat, message: "Un Authorization" });
  }
}
