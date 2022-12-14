import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_KEY}@cluster0.l1xz3m6.mongodb.net/events?retryWrites=true&w=majority`,
    );
    return client;
};
export const insertDocument = async (
    client: MongoClient,
    collection: string,
    document: { email: string },
) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
};

export const getAllDocuments = async (
    client: MongoClient,
    collection: string,
    sort: any,
    filter: { eventId: string },
) => {
    const db = client.db();
    const documents = await db.collection(collection).find(filter).sort(sort).toArray();
    return documents;
};
