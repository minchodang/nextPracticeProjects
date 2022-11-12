import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export type Data = {
    message?: string;
    registrationData?: {
        id: string;
        email: string;
    };
};

const connectDatabase = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_KEY}@cluster0.l1xz3m6.mongodb.net/events?retryWrites=true&w=majority`,
    );
    return client;
};
const insertDocument = async (client: MongoClient, document: { email: string }) => {
    const db = client.db();
    await db.collection('emails').insertOne(document);
};

const registrationHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log(req);
    if (req.method === 'POST') {
        const email = req.body.email;
        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }
        
        let client;
        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({
                message: 'Connecting to the database failed!',
            });
            return;
        }
        try {
            await insertDocument(client, {
                email: email,
            });
            client.close();
        } catch (error) {
            res.status(500).json({
                message: 'Inserting data failed!',
            });
            return;
        }
  
        res.status(201).json({
            message: 'Signed up!',
        });
    }
};

export default registrationHandler;
