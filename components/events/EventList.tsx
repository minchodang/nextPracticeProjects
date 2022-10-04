import { EventItem } from '@components/events/EventItem';
import styled from 'styled-components';

interface EventListProps {
    items: ItemType[];
}

export type ItemType = {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
};

const EventListContainer = styled.div`
    width: 90%;
    max-width: 40rem;
    margin: 5rem auto;
`;

export const EventList = ({ items }: EventListProps) => {
    return (
        <EventListContainer>
            {items.map((event) => (
                <EventItem
                    key={event.id}
                    id={event.id}
                    image={event.image}
                    description={event.description}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    isFeatured={event.isFeatured}
                />
            ))}
        </EventListContainer>
    );
};
