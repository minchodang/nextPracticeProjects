import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { EventList } from '@components/events/EventList';
import { EventSearch } from '@components/events/EventSearch';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-util';

const Events: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const findEventsHandler = (year: string, month: string) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={props.events} />
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const events = await getAllEvents();
    return {
        props: {
            events: events,
        },
        revalidate: 60,
    };
};

export default Events;
