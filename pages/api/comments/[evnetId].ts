import { buildCommentsPath, extractComments } from '@pages/api/comments/index';

const handler = (req: { query: { commentId: any } }, res: any) => {
    const commentId = req.query.commentId;
    const filePath = buildCommentsPath();
    const commentData = extractComments(filePath);
    // const selectedComment = commentData.find((comment: { id: any }) => comment.id === commentId);
    res.status(200).json({ comment: commentData });
};

export default handler;
