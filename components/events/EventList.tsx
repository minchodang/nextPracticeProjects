import { EventItem } from '@components/events/EventItem';

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

export const EventList = ({ items }: EventListProps) => {
    return (
        <ul>
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
        </ul>
    );
};
