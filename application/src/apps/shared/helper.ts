import { MouseEvent } from 'react';

export const formatTime = (timestamp: Date) => {
	const date = new Date(timestamp);
	return date.toLocaleTimeString();
};

export const findZIndex = (e?: MouseEvent) => {
	const current = e?.target as HTMLDivElement;
	const zIndexs = Array.from(document.querySelectorAll('[data-zindex]')).map((c) => +c.getAttribute('data-zindex'));
	const max = Math.max(...zIndexs);
	if (!e) {
		return {
			max,
		};
	}
	const cz = +current.parentElement.getAttribute('data-zindex');
	return {
		max,
		current: cz,
	};
};
