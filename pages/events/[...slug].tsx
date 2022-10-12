import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { EventList } from '@components/events/EventList';
import { Fragment } from 'react';
import ResultsTitle from '@components/events/ResultsTitle';
import { Button } from '@components/ui/button';
import ErrorAlert from '@components/ui/ErrorAlert';
import { getFilteredEvents } from '../../helpers/api-util';
import { useRouter } from 'next/router';

const FilteredEventsPage = (props: InferGetServerSidePropsType<GetServerSideProps>) => {
    const router = useRouter();
    //
    // const filterData = router.query.slug;
    //
    // if (!filterData) {
    //     return <p className={'center'}>Loading...</p>;
    // }
    //
    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];
    //
    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    if (props.hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    // const filteredEvents = getFilteredEvents({
    //     year: numYear,
    //     month: numMonth,
    // });

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    const filterData = params?.slug as string[];

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: { hasError: true },
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
};
export default FilteredEventsPage;
