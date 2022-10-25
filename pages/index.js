import Head from 'next/head';

import { Fragment } from 'react';

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='browse a huge list of highly active React meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
};

// export const getServerSideProps = async (context) => {
//     const req = context.req
//     const res = context.res
// 	// fetch data
// 	return {
// 		props: {
// 			meetups: DUMMY__MEETUPS,
// 		},
// 	};
// };

export const getStaticProps = async () => {
	// fetch data
	const client = await MongoClient.connect(
		'mongodb+srv://user3:H3hGY74PeBhDQelA@cluster0.mpcsjjk.mongodb.net/?retryWrites=true&w=majority'
	);

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
};

export default HomePage;
