import express from "express";
import {
    createUserRecord,
    deleteUserRecord,
    getAllUserRecords,
    getUserById,
    getWorkhoursForUser
} from "../controller/usersController.js";

const userRouter = express.Router();

userRouter.get('/', getAllUserRecords)
userRouter.get('/:id', getUserById)
userRouter.get('/:id/hours', getWorkhoursForUser)
userRouter.post('/', createUserRecord)
userRouter.delete('/:id', deleteUserRecord)

export default userRouter