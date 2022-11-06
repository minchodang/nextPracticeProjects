import { Data } from '@pages/api/comments/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const eventId = req.query.eventId;
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_KEY}@cluster0.l1xz3m6.mongodb.net/events?retryWrites=true&w=majority`,
    );

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({
                message: 'Invalid input',
            });
            return;
        }
        const newComment = {
            email: email,
            name: name,
            text: text,
            eventId: eventId,
        };

        const db = client.db();
        await db.collection('comments').insertOne(newComment);

        console.log(newComment);
        res.status(201).json({ message: 'Added comment', comments: newComment });
        client.close();
    }
    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Max', text: 'A first comment!' },
            { id: 'c2', name: 'Manuel', text: 'A second comment!' },
        ];
        res.status(200).json({
            comments: dummyList,
        });
    }
};

export default handler;
