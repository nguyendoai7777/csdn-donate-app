import { useEffect, useState } from 'react';
import { BE_URL } from '../app.const';
import AnimatedDonationAlerts from './Donations';

export function App() {
	return (
		<>
			<AnimatedDonationAlerts />
		</>
	);
}
/* 
fetch(`${BE_URL}/ping`)
	.then((data) => data.json())
	.then((data) => {
		console.log(`{} data: `, data);
	});
 */
