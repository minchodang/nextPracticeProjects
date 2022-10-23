import styled from 'styled-components';
import { FormEvent, MutableRefObject, useRef } from 'react';
import axios from 'axios';

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
    function registrationHandler(event: FormEvent) {
        event.preventDefault();
        const registerInput = inputRef.current?.value;

        axios
            .post(
                '/api/registration',
                {
                    email: registerInput,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .catch((error) => console.log(error))
            .then((response) => response)
            .then((data) => console.log(data));

        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API
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
