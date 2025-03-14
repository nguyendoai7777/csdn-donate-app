import { useEffect, useRef, useState } from 'react';
import { Donation } from '../shared/types';
import { BE_WS_URL } from '../../app.const';

export function useConnectDonationWebSocket() {
	const [connected, setConnected] = useState(false);
	const [donationsHistory, setDonationsHistory] = useState<Donation[]>([]);
	const [latestDonation, setLatestDonation] = useState<Donation>(null);
	const wsRef = useRef<WebSocket>(null);
	const alertTimerRef = useRef<number>(null);

	const showDonationAlert = (donation: Donation) => {
		setLatestDonation(donation);
	};

	useEffect(() => {
		// Connect to WebSocket
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

			ws.onerror = () => {
				setConnected(false);
			};

			ws.onclose = () => {
				setConnected(false);
			};

			return ws;
		};

		const ws = connectWebSocket();

		// Clean up function
		return () => {
			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.close();
			}
			if (alertTimerRef.current) {
				clearTimeout(alertTimerRef.current);
			}
		};
	}, []);

	return {
		connected,
		donationsHistory,
		latestDonation,
	};
}
