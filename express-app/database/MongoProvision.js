import mongoose from 'mongoose';

const connections = {}; // Object to store database connections

// Function to connect to a database
export const connectAuthenticationToDatabase = async (dbName = "Authentication") => {
    if (connections[dbName]) {
        console.log(`Reusing existing connection to database: ${dbName}`);
        return connections[dbName];
    }
    
    try {
        const connection = await mongoose.createConnection(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to database: ${dbName}`);
        connections[dbName] = connection;
        return connection;
    } catch (error) {
        console.error(`Error connecting to database: ${dbName}`, error);
        throw error;
    }
};

// Function to close a specific connection
export const closeDatabaseConnection = async (dbName) => {
    if (connections[dbName]) {
        await connections[dbName].close();
        console.log(`Closed connection to database: ${dbName}`);
        delete connections[dbName];
    } else {
        console.log(`No connection found for database: ${dbName}`);
    }
};

// Function to close all connections
export const closeAllDatabaseConnections = async () => {
    for (const [dbName, connection] of Object.entries(connections)) {
        await connection.close();
        console.log(`Closed connection to database: ${dbName}`);
        delete connections[dbName];
    }
};
