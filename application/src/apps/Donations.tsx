import { DragEvent, useEffect, useRef, useState } from 'react';
import { Donation } from '../../shared/types';
import { BE_URL, BE_WS_URL } from '../app.const';
import PopupWindowPortal, { DonationsHistoryList } from './DonationsHistory';
import { DonationToast } from './DonationToast';
import { DonationTop } from './DonationTop';
import { DragableToastZone, RealtimeDonationToaster } from './DragableToastZone';
import { Dragable } from './Dragable';

const AnimatedDonationAlerts = () => {
	const [connected, setConnected] = useState(false);
	const [donations, setDonations] = useState<Donation[]>([]);
	const [donationsHistory, setDonationsHistory] = useState<Donation[]>([]);
	const [latestDonation, setLatestDonation] = useState<Donation>(null);
	const wsRef = useRef<WebSocket>(null);
	const alertTimerRef = useRef(null);
	const getTopDonate = () => {
		fetch(`${BE_URL}/top`)
			.then((c) => c.json())
			.then((data) => {
				setDonations((data as any[]).slice(0, 3));
			});
	};
	useEffect(() => {
		// Kết nối WebSocket
		const connectWebSocket = () => {
			const ws = new WebSocket(`${BE_WS_URL}/ws`);
			wsRef.current = ws;
			ws.onopen = () => {
				setConnected(true);
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					if (data.type === 'donation') {
						showDonationAlert(data.data);
						setDonationsHistory((prev) => [data.data, ...prev]);
					}
				} catch (error) {
					console.error('Error parsing WebSocket message:', error);
				}
			};

			ws.onerror = (error) => {
				setConnected(false);
			};

			ws.onclose = () => {
				setConnected(false);
			};
			return ws;
		};

		connectWebSocket();
		getTopDonate();
		setInterval(() => {
			getTopDonate();
		}, 10000);
		// window.open('/', 'LiveChat', 'width=400,height=600');
		return () => {
			if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
				wsRef.current.close();
			}
			if (alertTimerRef.current) {
				clearTimeout(alertTimerRef.current);
			}
		};
	}, []);

	const showDonationAlert = (donation: Donation) => {
		setLatestDonation(donation);
	};

	const tada = () => {
		console.log(`{} send event to main: `);
	};

	return (
		<div className='w-full max-w-lg mx-auto'>
			<PopupWindowPortal height={800} width={400} title='History'>
				<DonationsHistoryList donations={donationsHistory} />
			</PopupWindowPortal>
			<RealtimeDonationToaster donation={latestDonation} />
			{donations.length === 0 ? <div className='text-gray-400 text-center py-4'>Hãy đợi một chút...</div> : <DonationTop donations={donations} />}
		</div>
	);
};

export default AnimatedDonationAlerts;
/* 
fetch(`${BE_URL}/ipn/momo`)
	.then((c) => c.json())
	.then((data) => {
		console.log(`{} data : `, data);
	});

fetch(`${BE_URL}/ipn/vnpay`)
	.then((c) => c.json())
	.then((data) => {
		console.log(`{} data : `, data);
	});
 */
