import { MongoClient } from 'mongodb';
export let db;
let client;
export const connectToDBServer = async (connectionURI) => {
    client = new MongoClient(connectionURI);
    await client.connect();
    db = client.db();
};
export const disconnectFromDBServer = async () => {
    await client.close();
};
