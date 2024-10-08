import { Request, Response } from "express";
import { addMemberAuthorityInProject, addUserProjectsInfo, checkEmailUIDExists, createOrSetProject } from "../../../lib/firebase-func";
import { generateNewUid, readUserIdFromTheCookis } from "../../../lib/utils";
import { AuthorityType, NewDataProject, ProjectType } from "../../../types";

export default async function AddProjectHandler(req: Request<{}, {}, ProjectType, {}>, res: Response) {
  const feat = "add project";
  const projectContent = req.body;
  try {
    const userId = readUserIdFromTheCookis(req) as string;

    if (!projectContent) {
      return res.status(500).json({
        status: "fail",
        message: "require project name and userId !!!",
        feat,
      });
    }

    const projectId = generateNewUid();
    const dataProject: NewDataProject = {
      ...projectContent,
      projectId,
      dueTime: Date.now(),
    };

    if (!(await checkEmailUIDExists(userId))) {
      return res.status(409).json({
        status: "fail",
        error: "user doesn't exists!",
        feat,
      });
    }

    try {
      await addUserProjectsInfo(userId, projectId);
      await createOrSetProject(projectId, dataProject);

      const createrAuthority = ["Owner", "Edit", "View"] as AuthorityType[];
      await addMemberAuthorityInProject(projectId, userId, createrAuthority);

      return res.status(200).json({
        status: "success",
        message: "Create new project successfull",
        projectId,
        feat,
      });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        message: "something wrong when add new project",
        feat,
        error,
      });
    }
  } catch (error) {
    return res.status(401).json({ status: "fail", feat, message: "Un Authorization" });
  }
}
