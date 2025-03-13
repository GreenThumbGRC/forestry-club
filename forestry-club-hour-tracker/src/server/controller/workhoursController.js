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

export const getWorkhoursByUsername = async (req, res) => {
    const data = await db.getWorkhoursByUsername(req.params.username)
    if (data) {
        res.status(200).json({
            data: data
        })
    } else {
        res.status(404);
        res.json({
            message: `Workhour record: ${req.params.username} not found`
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

export const putWorkhourRecord = async (req, res) => {
    const record = req.body;

    console.log(req.body);

    const result = db.updateUserRecord(record);

    if (result) {
        res.status(204).send("updated record");
        console.log("updated record")
    }
    else {
        res.status(404).send("Not found");
        console.log("error: record not found")
    }
}