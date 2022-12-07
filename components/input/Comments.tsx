import styled from 'styled-components';
import CommentList from '@components/input/Comment-list';
import { useContext, useEffect, useState } from 'react';
import NewComment from '@components/input/New-comments';
import axios from 'axios';
import NotificationContext from '../../store/notification-context';

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
`;

const ShowButton = styled.div`
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
`;

const Comments = ({ eventId }: CommentsProps) => {
    const notificationCtx = useContext(NotificationContext);

    const [showComments, setShowComments] = useState<boolean>(false);
    const [commentLists, setCommentLists] = useState([]);
    const [isFetchingComments, setIsFetchingComments] = useState(false);
    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    useEffect(() => {
        if (showComments) {
            setIsFetchingComments(true);
            axios
                .get(`/api/comments/${eventId}`)
                .then((response) => response)
                .then((data) => {
                    setCommentLists(data.data.comments);
                    setIsFetchingComments(false);
                });
        }
    }, [eventId, showComments]);
    function addCommentHandler(commentEmail: string, commentName: string, commentText: string) {
        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Your comment is currently being stored into a database.',
            status: 'pending',
        });
        axios
            .post(
                `/api/comments/${eventId}`,
                {
                    email: commentEmail,
                    name: commentName,
                    text: commentText,
                },
                {
                    params: {
                        eventId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => response)
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success',
                    message: 'Your comment was saved!.',
                    status: 'success',
                });
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: error.message || 'Something went wrong!',
                    status: 'error',
                });
            });
        // send data to API
    }

    return (
        <CommentsContainer>
            <ShowButton onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </ShowButton>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isFetchingComments && <CommentList commentLists={commentLists} />}
            {showComments && isFetchingComments && <p>Loading...</p>}
        </CommentsContainer>
    );
};

export default Comments;
