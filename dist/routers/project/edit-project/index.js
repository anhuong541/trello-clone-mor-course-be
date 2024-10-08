"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditProjectHandler;
const tslib_1 = require("tslib");
const firebase_func_1 = require("../../../lib/firebase-func");
const utils_1 = require("../../../lib/utils");
function EditProjectHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "edit project";
        let projectContent = req.body;
        try {
            const userId = (0, utils_1.readUserIdFromTheCookis)(req);
            if (!projectContent) {
                return res.status(404).json({
                    status: "fail",
                    message: "your project name is missing",
                    feat,
                });
            }
            yield (0, utils_1.checkUIDAndProjectExists)(userId, projectContent.projectId, feat, res);
            let userAuthority = [];
            try {
                const dataProject = yield (0, firebase_func_1.checkUserAuthority)(projectContent.projectId, userId);
                userAuthority = dataProject.authority;
            }
            catch (error) {
                return res.status(400).json({ status: "fail", feat, message: "Didn't find project data" });
            }
            if (!userAuthority.includes("Edit")) {
                return res.status(403).json({
                    status: "fail",
                    feat,
                    message: "User Didn't have an authority to edit project",
                });
            }
            const dataInput = Object.assign(Object.assign({}, projectContent), { dueTime: Date.now() });
            try {
                yield (0, firebase_func_1.createOrSetProject)(projectContent.projectId, dataInput);
                yield (0, firebase_func_1.addUserProjectsInfo)(userId, projectContent.projectId);
                return res.status(200).json({
                    status: "success",
                    feat,
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: "fail",
                    message: "something wrong!!!",
                    feat,
                    error,
                });
            }
        }
        catch (error) {
            return res.status(401).json({ status: "fail", feat, message: "Un Authorization" });
        }
    });
}
//# sourceMappingURL=index.js.map