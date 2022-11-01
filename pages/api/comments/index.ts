import path from 'path';
import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
    message?: string;
    comments?: CommentDataType | CommentLists[];
};

export interface CommentDataType {
    id: string;
    email: string;
    name: string;
    text: string;
}

export interface CommentLists {
    id: string;
    name: string;
    text: string;
}

export interface CommentLists {
    id: string;
    name: string;
    text: string;
}

export function buildCommentsPath() {
    return path.join(process.cwd(), 'data', 'comments.json');
}

export function extractComments(filePath: fs.PathOrFileDescriptor) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(String(fileData));
    return data;
}

const registrationHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log(req);
    if (req.method === 'POST') {
        const email = req.body.email;
        const name = req.body.name;
        const comment = req.body.comment;
        const filePath = buildCommentsPath();
        const data = extractComments(filePath);

        const commentData = {
            id: new Date().toISOString(),
            email: email,
            name: name,
            comment: comment,
        };

        data.push(commentData);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({
            message: 'Success!',
            comments: comment,
        });
    } else {
        return;
    }
};

export default registrationHandler;
