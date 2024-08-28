"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMemberOutOfProject = exports.updateMemberAuthorityInProject = exports.viewMemberInProject = exports.addProjectIntoMemberData = exports.updateMemberInProject = exports.addMemberAuthorityInProject = exports.deteleTask = exports.viewTasksProject = exports.createOrSetTask = exports.getUpdateProjectDueTime = exports.getProjectListByUser = exports.checkUserAuthority = exports.getProjectInfo = exports.deteleProject = exports.createOrSetProject = exports.addUserProjectsInfo = exports.createNewUser = exports.getUserDataById = exports.checkProjectExists = exports.deleteAccountUnActive = exports.checkUserAccountIsActive = exports.checkEmailUIDExists = void 0;
const tslib_1 = require("tslib");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@/db/firebase");
// user
const checkEmailUIDExists = (uid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, `users`, uid))).exists();
    }
    catch (error) {
        console.log("this is the error: ", error);
        return null;
    }
});
exports.checkEmailUIDExists = checkEmailUIDExists;
const checkUserAccountIsActive = (uid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = (yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, `users`, uid))).data();
        if (userData === null || userData === void 0 ? void 0 : userData.isActive) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log("this is the error: ", error);
        return null;
    }
});
exports.checkUserAccountIsActive = checkUserAccountIsActive;
const deleteAccountUnActive = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, `users`, userId));
    }
    catch (error) {
        console.log("error when delete user: ", error);
        return null;
    }
});
exports.deleteAccountUnActive = deleteAccountUnActive;
const checkProjectExists = (projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId))).exists();
});
exports.checkProjectExists = checkProjectExists;
const getUserDataById = (uid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, `users`, uid))).data();
});
exports.getUserDataById = getUserDataById;
const createNewUser = (uid, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "users", uid), data);
});
exports.createNewUser = createNewUser;
const addUserProjectsInfo = (uid, projectId, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "users", uid, "projects", projectId), data);
});
exports.addUserProjectsInfo = addUserProjectsInfo;
//project
const createOrSetProject = (projectId, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId), data);
});
exports.createOrSetProject = createOrSetProject;
const deteleProject = (uid, projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "users", uid, "projects", projectId));
    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId));
    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "authority", uid));
});
exports.deteleProject = deteleProject;
const getProjectInfo = (projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId))).data();
});
exports.getProjectInfo = getProjectInfo;
const checkUserAuthority = (projectId, userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "authority", userId))).data();
});
exports.checkUserAuthority = checkUserAuthority;
const getProjectListByUser = (uid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const listProjectRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.firestoreDB, "users", uid, "projects"));
    return listProjectRef.docs.map((item) => item.data());
});
exports.getProjectListByUser = getProjectListByUser;
const getUpdateProjectDueTime = (projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId), {
        dueTime: Date.now(),
    });
});
exports.getUpdateProjectDueTime = getUpdateProjectDueTime;
// task feature
const createOrSetTask = (projectId, taskId, contentTask) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "tasks", taskId), contentTask);
});
exports.createOrSetTask = createOrSetTask;
const viewTasksProject = (projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.firestoreDB, "projects", projectId, "tasks"))).docs.map((item) => item.data());
});
exports.viewTasksProject = viewTasksProject;
const deteleTask = (projectId, taskId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "tasks", taskId));
});
exports.deteleTask = deteleTask;
// member
const addMemberAuthorityInProject = (projectId, userId, authority) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "authority", userId), { authority });
});
exports.addMemberAuthorityInProject = addMemberAuthorityInProject;
const updateMemberInProject = (memberId, projectId, members) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId), { members: [...members, memberId] });
});
exports.updateMemberInProject = updateMemberInProject;
const addProjectIntoMemberData = (memberId, projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projectInfo = yield (0, exports.getProjectInfo)(projectId);
    // console.log({ projectInfo });
    let input = projectInfo;
    yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId), { members: [...input.members, memberId] });
    delete input.members;
    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "users", memberId, "projects", projectId), input);
});
exports.addProjectIntoMemberData = addProjectIntoMemberData;
const viewMemberInProject = (projectId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.firestoreDB, "projects", projectId, "authority"));
});
exports.viewMemberInProject = viewMemberInProject;
const updateMemberAuthorityInProject = (projectId, userId, authority) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "authority", userId), { authority });
});
exports.updateMemberAuthorityInProject = updateMemberAuthorityInProject;
const removeMemberOutOfProject = (projectId, memberId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projectInfo = yield (0, exports.getProjectInfo)(projectId);
    // console.log({ projectInfo });
    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId, "authority", memberId));
    const removedMemberArr = projectInfo.members.filter((item) => item !== memberId);
    yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "projects", projectId), {
        members: [...removedMemberArr],
    });
    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.firestoreDB, "users", memberId, "projects", projectId));
});
exports.removeMemberOutOfProject = removeMemberOutOfProject;
//# sourceMappingURL=firebase-func.js.map