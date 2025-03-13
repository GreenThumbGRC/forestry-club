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

export const getWorkhoursByUsername = async (username) => {
    const db = await connection()
    const [results] = await db.query(
        `SELECT users.user_id, users.user_flags, users.username, users.fname, users.lname, 
        workhours.time_in, workhours.time_out, workhours.under_review, workhours.accepted,
        DATE(workhours.time_out) AS date_worked, workhours.submission_id,
        TIMESTAMPDIFF(MINUTE, workhours.time_in, workhours.time_out) / 60 AS hours
        FROM users 
        LEFT JOIN workhours
        ON users.user_id = workhours.user_id
        Where users.username = ?`, [username]
    )
    db.end()
    return results
}

export const createWorkhourRecord = async (newRecord) => {
    const db = await connection()
    const [results] = await db.query(
        'INSERT INTO workhours (time_in, time_out, user_id, under_review, accepted) VALUES (?, ?, ?, ?, ?)' ,
        [newRecord.time_in, newRecord.time_out, newRecord.user_id, newRecord.under_review, newRecord.accepted]
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

export const updateUserRecord = async (record) => {
    if (!record) {
        console.err("Error: no record")
        return false;
    }
    const db = await connection()
    const id = Number.parseInt(record.submission_id)

    console.log(`update request for record: ${record.submission_id} to value: ${record.accepted}`);

    const [results] = await db.query(
        `
        UPDATE workhours
        SET under_review = 0, accepted = ?
        WHERE submission_id = ?
        `,
        [record.accepted, id]
    );

    db.end();

    return results;
}