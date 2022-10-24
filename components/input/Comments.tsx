import styled from 'styled-components';
import CommentList from '@components/input/Comment-list';
import { useEffect, useState } from 'react';
import NewComment from '@components/input/New-comments';
import axios from 'axios';

interface CommentsProps {
    eventId: string;
}

const CommentsContainer = styled.section`
    margin: 3rem auto;
    width: 90%;
    max-width: 40rem;
    text-align: center;
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
    button {
        font: inherit;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        background-color: transparent;
        color: #03be9f;
        border: 1px solid #03be9f;
        cursor: pointer;
        :hover,
        :active {
            background-color: #dcfff9;
        }
    }
`;

const Comments = ({ eventId }: CommentsProps) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [commentLists, setCommentLists] = useState([]);
    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentEmail: string, commentName: string, commentText: string) {
        axios
            .post(
                '/api/comments',
                {
                    email: commentEmail,
                    name: commentName,
                    comment: commentText,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => response)
            .then((data) => console.log(data));
        // send data to API
    }

    useEffect(() => {
        axios.get(`/api/comments/${eventId}`).then((res) => setCommentLists(res.data.comment));
        // console.log(commentLists);
    }, [commentLists, eventId, showComments]);

    return (
        <CommentsContainer>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList commentLists={commentLists} />}
        </CommentsContainer>
    );
};

export default Comments;