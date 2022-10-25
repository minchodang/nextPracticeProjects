import path from 'path';
import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
    message?: string;
    registrationData?: {
        id: string;
        email: string;
    };
};

export function buildRegistrationPath() {
    return path.join(process.cwd(), 'data', 'registration.json');
}

export function extractRegistration(filePath: fs.PathOrFileDescriptor) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(String(fileData));
    return data;
}

const registrationHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log(req);
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        const filePath = buildRegistrationPath();
        const data = extractRegistration(filePath);

        const registrationData = {
            id: new Date().toISOString(),
            email: email,
        };

        data.push(registrationData);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({
            message: 'Signed up!',
            registrationData: registrationData,
        });
    } else {
        const filePath = buildRegistrationPath();
        const data = extractRegistration(filePath);
        res.status(200).json({ registrationData: data });
    }
};

export default registrationHandler;
