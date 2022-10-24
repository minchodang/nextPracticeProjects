import styled from 'styled-components';
import { CommentDataType } from '@pages/api/comments';

interface CommentListProps {
    commentLists: CommentDataType[];
}

const CommentListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    li {
        text-align: left;
        padding: 0.5rem 0;
        border-bottom: 2px solid #ccc;
    }
    p {
        margin: 0;
    }
    li div {
        text-align: right;
        font-style: italic;
    }
    address {
        display: inline;
    }
`;

const CommentList = ({ commentLists }: CommentListProps) => {
    return (
        <CommentListContainer>
            {/* Render list of comments - fetched from API */}
            {commentLists &&
                commentLists.map((comments) => (
                    <li key={comments.id}>
                        <p>{comments.comment}</p>

                        <div>
                            By <address>{comments.name}</address>
                        </div>
                    </li>
                ))}
        </CommentListContainer>
    );
};

export default CommentList;
