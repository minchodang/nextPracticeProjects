import styled from 'styled-components';
import { Button } from '@components/ui/button';
import DateIcon from '@components/icons/date-icon';
import AddressIcon from '@components/icons/address-icon';
import ArrowRightIcon from '@components/icons/arrow-right-icon';

export type ItemType = {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
};

const ClassListContainer = styled.li`
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 1px 12px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    img {
        @media (min-width: 768px) {
            width: 40%;
            height: 14rem;
        }
        width: 100%;
        object-fit: cover;
        height: 10rem;
    }
`;
const Content = styled.div`
    width: 100%;
    padding: 0 1rem;
    text-align: center;
    h2 {
        margin: 0.5rem 0;
        @media (min-width: 768px) {
            margin: 1rem 0;
        }
    }
    time {
        color: #666666;
        font-weight: bold;
    }
    address {
        margin: 0.5rem 0;
        color: #666666;
        white-space: pre;
    }
    @media (min-width: 768px) {
        width: 60%;
        padding: 0;
        text-align: left;
    }
`;
const Summary = styled.div``;

const DateContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #666666;
    }
`;
const AddressContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    svg {
        width: 1.25rem;
        height: 1.25rem;
        color: #666666;
    }
`;
const Actions = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: flex-end;
    }
    a {
        display: block;
        span {
            vertical-align: middle;
        }
    }
`;

const IconContainer = styled.span`
    margin-left: 0.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 1.25rem;
        height: 1.25rem;
    }
`;

export const EventItem = ({ title, image, date, location, id }: ItemType) => {
    const humanReadableDate = new Date(date).toLocaleDateString('ko-KR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`;
    return (
        <ClassListContainer>
            <img src={'/' + image} alt={title} />
            <Content>
                <Summary>
                    <h2>{title}</h2>
                    <DateContainer>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </DateContainer>
                    <AddressContainer>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </AddressContainer>
                </Summary>
                <Actions>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <IconContainer>
                            <ArrowRightIcon />
                        </IconContainer>
                    </Button>
                </Actions>
            </Content>
        </ClassListContainer>
    );
};
