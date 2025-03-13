export const formatTime = (timestamp: Date) => {
	const date = new Date(timestamp);
	return date.toLocaleTimeString();
};
