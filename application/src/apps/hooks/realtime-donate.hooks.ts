import { useEffect, useRef, useState, FC } from 'react';
import { Donation } from '../shared/types';
import { PDonation } from '../shared/Donation.types';

export const useRealtimeDonateBusiness = ({ donation }: PDonation) => {
	const [activeToasts, setActiveToasts] = useState<Donation[]>([]);
	const [, setExitingToasts] = useState<Donation[]>([]);
	const timeoutRef = useRef<number>(null);
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
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = window.setTimeout(() => {
			removeToast(newDonation.id);
		}, TOAST_DURATION);
		return () => {
			clearTimeout(timeoutRef.current);
		};
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

	return activeToasts;
};
