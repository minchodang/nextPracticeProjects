import { getFeaturedEvents } from '../helpers/api-util';
import { EventList } from '@components/events/EventList';
import { InferGetStaticPropsType } from 'next';
import NewsletterRegistration from '@components/input/NewsLetter-registration';
import Head from 'next/head';

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <NewsletterRegistration />
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
