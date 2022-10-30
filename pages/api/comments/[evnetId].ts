import { buildCommentsPath, Data, extractComments } from '@pages/api/comments/index';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const eventId = req.query.eventId;
    if (req.method === 'POST') {
        const { email, name, text } = req.body;
        const filePath = buildCommentsPath();
        const data = extractComments(filePath);

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({
                message: 'Invalid input',
            });
            return;
        }
        const newComment = {
            id: new Date().toISOString(),
            email: email,
            name: name,
            comment: text,
        };
        console.log(newComment);
        res.status(201).json({ message: 'Added comment', comments: newComment });
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
