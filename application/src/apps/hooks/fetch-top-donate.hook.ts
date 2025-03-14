import { useEffect, useState } from 'react';
import { Donation } from '../shared/types';
import { BE_URL } from '../../app.const';

export function useFetchTopDonations() {
	const [donations, setDonations] = useState<Donation[]>([]);

	const fetchTopDonations = () => {
		fetch(`${BE_URL}/top`)
			.then((c) => c.json())
			.then((data) => {
				setDonations((data as any[]).slice(0, 3));
			});
	};

	useEffect(() => {
		fetchTopDonations();
		const intervalId = setInterval(() => {
			fetchTopDonations();
		}, 10000);
		return () => clearInterval(intervalId);
	}, []);

	return { donations, isLoading: donations.length === 0 };
}
