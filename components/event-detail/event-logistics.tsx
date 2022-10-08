import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import styled from 'styled-components';

interface EventLogisticsProps {
    date: string;
    address: string;
    image: string;
    imageAlt: string;
}

const LogisticsSection = styled.section`
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: #2b2b2b;
    padding: 2rem;
    max-width: 50rem;
    width: 80%;
    margin: -3rem auto;
    color: #d5eeeb;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        padding: 2rem;
        margin: -5rem auto;
        gap: 3rem;
        flex-direction: row;
        align-items: stretch;
    }
`;

const ImageContainer = styled.div`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid white;
    img {
        width: 10rem;
        height: 10rem;
        object-fit: cover;

        @media (min-width: 768px) {
            width: 20rem;
            height: 20rem;
        }
    }
    @media (min-width: 768px) {
        width: 20rem;
        height: 20rem;
    }
`;

const ListContainer = styled.ul`
    flex: 3;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    address {
        white-space: pre;
    }
    @media (min-width: 768px) {
        align-items: flex-start;
    }
`;

function EventLogistics({ date, address, image, imageAlt }: EventLogisticsProps) {
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const addressText = address.replace(', ', '\n');

    return (
        <LogisticsSection>
            <ImageContainer>
                <img src={`/${image}`} alt={imageAlt} />
            </ImageContainer>
            <ListContainer>
                <LogisticsItem Icon={<DateIcon />}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem Icon={<AddressIcon />}>
                    <address>{addressText}</address>
                </LogisticsItem>
            </ListContainer>
        </LogisticsSection>
    );
}

export default EventLogistics;
