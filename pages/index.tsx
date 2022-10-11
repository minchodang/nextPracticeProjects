import { getFeaturedEvents } from '../helpers/api-util';
import { EventList } from '@components/events/EventList';
import { InferGetStaticPropsType } from 'next';

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <EventList items={props.events} />
        </div>
    );
};

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    };
}

export default HomePage;
