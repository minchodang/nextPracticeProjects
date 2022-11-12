import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, insertDocument } from '../../../helpers/db-util';

export type Data = {
    message?: string;
    registrationData?: {
        id: string;
        email: string;
    };
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
            await insertDocument(client, 'newsletter', {
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
