import styled from 'styled-components';
import { Button } from '@components/ui/button';

interface ResultsTitleProps {
    date: Date;
}

const Title = styled.section`
    margin: 2rem auto;
    width: 90%;
    max-width: 40rem;
    text-align: center;
`;

function ResultsTitle({ date }: ResultsTitleProps) {
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <Title>
            <h1>Events in {humanReadableDate}</h1>
            <Button link="/events">Show all events</Button>
        </Title>
    );
}

export default ResultsTitle;
