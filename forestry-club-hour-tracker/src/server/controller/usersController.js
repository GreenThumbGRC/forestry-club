import * as db from '../db/usersDB.js'

export const getAllUserRecords = async (req, res) => {
    const data = await db.getAllUserRecords()
    if (data) {
        res.status(200).json({
            data: data
        })
    } else {
        res.status(404);
        res.json({
            message: `Data not found`
        })
    }
}

export const getUserById = async (req, res) => {
    const data = await db.getUserById(req.params.id)
    if (data) {
        res.status(200).json({
            data: data
        })
    } else {
        res.status(404);
        res.json({
            message: `User: ${req.params.id} not found`
        })
    }
}

export const getWorkhoursForUser = async (req, res) => {
    const data = await db.getWorkhoursForUser(req.params.id)
    if (data) {
        res.status(200).json({
            data: data
        })
    } else {
        res.status(404);
        res.json({
            message: `User hours for: ${req.params.id} not found`
        })
    }
}

export const createUserRecord = async (req, res) => {
    const insertedRecord = await db.createUserRecord(req.body)
    if (insertedRecord) {
        res.status(201).json({
            data: insertedRecord
        })
    } else {
        res.status(404);
        res.json({
            message: `Error adding record \n${req.body}`
        })
    }
}

export const deleteUserRecord = async (req, res) => {
    const deletedRecord = await db.deleteUserRecord(req.params.id)
    if (deletedRecord) {
        res.status(204)
    } else {
        res.status(404);
        res.json({
            message: `Error deleting record ${req.params.id}`
        })
    }
}