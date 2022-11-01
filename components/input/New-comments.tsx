import React, { useRef, useState } from 'react';
import styled from 'styled-components';

interface NewCommentProps {
    onAddComment: (enteredEmail: any, enteredName: any, enteredComment: any) => void;
}

const Form = styled.form`
    margin: 2rem auto;
    width: 100%;
    border-radius: 6px;
    background-color: #03be9f;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    button {
        background-color: white;
    }
`;

const Row = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const Control = styled.div`
    margin-bottom: 0.5rem;
    flex: 1;
    min-width: 10rem;
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: white;
        text-align: left;
    }
    input,
    textarea {
        font: inherit;
        padding: 0.25rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 100%;
        background-color: #dcfff9;
    }
`;

const NewComment = ({ onAddComment }: NewCommentProps) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailInputRef = useRef<any>(null);
    const nameInputRef = useRef<any>(null);
    const commentInputRef = useRef<any>(null);

    function sendCommentHandler(event: React.FormEvent) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredName = nameInputRef.current?.value;
        const enteredComment = commentInputRef.current.value;

        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredComment ||
            enteredComment.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }

        onAddComment(enteredEmail, enteredName, enteredComment);
    }

    return (
        <Form onSubmit={sendCommentHandler}>
            <Row>
                <Control>
                    <label htmlFor="email">Your email</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </Control>
                <Control>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" ref={nameInputRef} />
                </Control>
            </Row>
            <Control>
                <label htmlFor="comment">Your comment</label>
                <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
            </Control>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button onClick={sendCommentHandler}>Submit</button>
        </Form>
    );
};

export default NewComment;
