import * as db from '../db/workhoursDB.js'

export const getAllWorkhourRecords = async (req, res) => {
    const data = await db.getAllWorkhourRecords()
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

export const getWorkhoursById = async (req, res) => {
    const data = await db.getWorkhoursById(req.params.id)
    if (data) {
        res.status(200).json({
            data: data
        })
    } else {
        res.status(404);
        res.json({
            message: `Workhour record: ${req.params.id} not found`
        })
    }
}

export const createWorkhourRecord = async (req, res) => {
    const insertedRecord = await db.createWorkhourRecord(req.body)
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

export const deleteWorkhourRecord = async (req, res) => {
    const deletedRecord = await db.deleteWorkhourRecord(req.params.id)
    if (deletedRecord) {
        res.status(204)
    } else {
        res.status(404);
        res.json({
            message: `Error deleting record ${req.params.id}`
        })
    }
}