import { Data } from '@pages/api/comments/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getAllDocuments, insertDocument } from '../../../helpers/db-util';

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const eventId = req.query.eventId;

    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({
            message: 'Connecting to the database failed',
        });
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text, _id } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({
                message: 'Invalid input',
            });
            client.close();
        }
        const newComment = {
            _id,
            email: email,
            name: name,
            text: text,
            eventId: eventId,
        };

        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Added comment', comments: newComment });
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed!' });
        }
    }
    if (req.method === 'GET') {
        let documents;
        try {
            documents = await getAllDocuments(
                client,
                'comments',
                { _id: -1 },
                {
                    eventId: eventId as string,
                },
            );
            res.status(200).json({
                comments: documents,
            });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed!' });
        }
    }
    client.close();
};

export default handler;
