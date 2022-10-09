import type { NextPage } from 'next';
import { getFeaturedEvents } from '../dummy-data';
import { EventList } from '@components/events/EventList';
import styled from 'styled-components';

const Container = styled.div``;

const Home: NextPage = () => {
    const featuredEvents = getFeaturedEvents();
    return (
        <Container>
            <EventList items={featuredEvents} />
        </Container>
    );
};

export default Home;
