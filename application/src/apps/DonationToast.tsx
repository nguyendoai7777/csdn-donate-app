import { FC, useEffect, useRef, useState } from 'react';
import { Donation } from './shared/types';
import { DonateCard } from './DonateCard';
import { PDonation } from './Donation.types';
/* export interface Donation {
	id?: number;
	name: string;
	amount: string;
	message: string;
	imageUrl: string;
	timestamp?: Date;
}
 */
export const DonationToast: FC<PDonation> = ({ donation }) => {
	const [activeToasts, setActiveToasts] = useState<Donation[]>([]);
	const [, setExitingToasts] = useState<Donation[]>([]);
	const MAX_TOASTS = 2;
	const TOAST_DURATION = 5300;

	useEffect(() => {
		if (!donation) return;

		const newDonation = donation.id ? donation : { ...donation, id: Date.now() };

		setActiveToasts((prev) => {
			const currentToasts = [...prev];

			if (currentToasts.length >= MAX_TOASTS) {
				const oldestToast = currentToasts.shift();
				if (oldestToast) {
					setExitingToasts((prev) => [...prev, oldestToast]);
				}
			}

			return [...currentToasts, newDonation];
		});

		setTimeout(() => {
			removeToast(newDonation.id);
		}, TOAST_DURATION);
	}, [donation]);

	const removeToast = (id?: number) => {
		if (!id) return;

		const toastToRemove = activeToasts.find((t) => t.id === id);

		if (toastToRemove) {
			setExitingToasts((prev) => [...prev, toastToRemove]);
			setActiveToasts((prev) => prev.filter((toast) => toast.id !== id));
		}
	};

	useEffect(() => {
		if (activeToasts.length === 0) return;

		const intervalId = setInterval(() => {
			if (activeToasts.length > 0) {
				const oldestToast = activeToasts[0];
				removeToast(oldestToast.id);
			}
		}, TOAST_DURATION);

		return () => {
			clearInterval(intervalId);
		};
	}, [activeToasts]);

	return (
		<>
			{activeToasts.map((d, idx) => (
				<DonateCard donate={d} key={d.id} />
			))}
		</>
	);
};
