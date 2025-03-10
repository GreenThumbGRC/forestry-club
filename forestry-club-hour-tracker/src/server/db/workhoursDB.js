import connection from "./database.js";

export const getAllWorkhourRecords = async () => {
    const db = await connection()
    const [results] = await db.query(
        'SELECT * FROM workhours'
    );
    db.end()
    return results
}

export const getWorkhoursById = async (id) => {
    const db = await connection()
    id = Number.parseInt(id)
    const [results] = await db.query(
        'SELECT * FROM workhours WHERE submission_id = ?', [id]
    );
    db.end()
    return results
}

export const createWorkhourRecord = async (newRecord) => {
    const db = await connection()
    const [results] = await db.query(
        'INSERT INTO workhours (time_in, time_out, user_id, under_review, accepted) VALUES (?, ?, ?, ?, ?)' ,
        [newRecord.time_in, newRecord.time_out, newRecord.user_id, newRecord.create_date, newRecord.under_review, newRecord.accepted]
    );
    db.end()
    return results
}

export const deleteWorkhourRecord = async (id) => {
    const db = await connection()
    id = Number.parseInt(id)
    const [results] = await db.query(
        'DELETE FROM workhours WHERE submission_id = ?' , [id]
    );
    db.end()
    return results
}