import connection from '../db/database.js'

export const getAllUserRecords = async () => {
    const db = await connection()
    const [results] = await db.query(
        'SELECT * FROM users'
    );
    db.end()
    return results
}

export const getUserById = async (id) => {
    const db = await connection()
    id = Number.parseInt(id)
    const [results] = await db.query(
        'SELECT * FROM users WHERE user_id = ?', [id]
    );
    db.end()
    return results
}

export const getWorkhoursForUser = async (id) => {
    const db = await connection()
    id = Number.parseInt(id)
    const [results] = await db.query(
        `
SELECT workhours.submission_id, users.username, workhours.time_in, workhours.time_out, workhours.create_date, 
       workhours.under_review, workhours.accepted 
FROM workhours
INNER JOIN users ON workhours.user_id = users.user_id
WHERE users.user_id = ?`, [id]
    );
    db.end()
    return results
}

export const createUserRecord = async (newRecord) => {
    const db = await connection()
    const [results] = await db.query(
        'INSERT INTO users (username, user_flags, fname, lname) VALUES (?, ?, ?, ?)' ,
        [newRecord.username, newRecord.user_flags, newRecord.fname, newRecord.lname, newRecord.create_date]
    );
    db.end()
    return results
}

export const deleteUserRecord = async (id) => {
    const db = await connection()
    id = Number.parseInt(id)
    const [results] = await db.query(
        'DELETE FROM users WHERE user_id = ?' ,
        [id]
    );
    db.end()
    return results
}