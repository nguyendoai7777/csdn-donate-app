export interface Donation {
	id?: number;
	name: string;
	amount: string;
	message: string;
	imageUrl: string;
	totalAmount: number;
	timestamp?: Date | string | number;
}
export interface UseElementSizeProps {
	width: number;
	height: number;
}
