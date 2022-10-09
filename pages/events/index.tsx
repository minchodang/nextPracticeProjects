import { NextPage } from 'next';
import { getAllEvents } from '../../dummy-data';
import { EventList } from '@components/events/EventList';
import { EventSearch } from '@components/events/EventSearch';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

const Events: NextPage = () => {
    const events = getAllEvents();
    const router = useRouter();
    const findEventsHandler = (year: string, month: string) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
};

export default Events;
