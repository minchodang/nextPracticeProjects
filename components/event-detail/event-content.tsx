import { ReactNode } from 'react';
import styled from 'styled-components';

interface EventContentProps {
    children: ReactNode;
}

const EventContentSection = styled.section`
    font-size: 1.5rem;
    color: #3a3a3a;
    width: 90%;
    max-width: 40em;
    margin: auto;
    margin-top: 8rem;
    text-align: center;
`;

function EventContent({ children }: EventContentProps) {
    return <EventContentSection>{children}</EventContentSection>;
}

export default EventContent;
