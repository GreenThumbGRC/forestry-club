import mysql from 'mysql2/promise'

// TODO: I should really be in a .env file. 
const connectDb = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'forestry_user',
        database: 'forestry_db',
        password: 'F6CraKpFjfbIo1',
        port: 3306
    });

    if (!connection) {
        console.error('Failed to make a connection.')
    } else {console.log('server connection')}

    return connection;
}

export default connectDb
