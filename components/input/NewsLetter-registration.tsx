import styled from 'styled-components';
import { FormEvent, MutableRefObject, useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';

const NewsLetter = styled.section`
    margin: 3rem auto;
    width: 90%;
    max-width: 20rem;
    h2 {
        text-align: center;
    }
    button {
        background-color: #03be9f;
        border: 1px solid #03be9f;
        border-radius: 6px;
        color: #dafff7;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font: inherit;
        cursor: pointer;
        :hover,
        :active {
            background-color: #02afa1;
            border-color: #02afa1;
        }
    }
`;

const Control = styled.div`
    display: flex;
    input {
        flex: 1;
        font: inherit;
        padding: 0.25rem;
        border-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #ccc;
    }
`;
const NewsletterRegistration = () => {
    const inputRef = useRef<any>(null);
    const notificationCtx = useContext(NotificationContext);

    useContext(NotificationContext);
    function registrationHandler(event: FormEvent) {
        event.preventDefault();
        const registerInput = inputRef.current?.value;

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Registering for newsletter.',
            status: 'pending',
        });
        fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify({ email: registerInput }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong!');
                });
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Successfully registered for newsletter!',
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
    }

    return (
        <NewsLetter>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <Control>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        ref={inputRef as MutableRefObject<any>}
                    />
                    <button>Register</button>
                </Control>
            </form>
        </NewsLetter>
    );
};

export default NewsletterRegistration;
