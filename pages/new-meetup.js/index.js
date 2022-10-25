import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
	const router = useRouter();

	const addMeetupHandler = async enteredMeetupData => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);

		router.replace('/'); // przenosi do danego url, replace uniemozliwia 'back', push daje mozliwosc cofniecia sie do poprzedniego url
	};

	return (
		<Fragment>
			<Head>
				<title>Add a New Meetup</title>
				<meta
					name='description'
					content='add your own meetups and create amazing networking opportunities!'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</Fragment>
	);
};

export default NewMeetupPage;
