import { UIContextBridge } from '../context-brige.types';

declare global {
	interface Window {
		UIContextBridge: UIContextBridge;
	}
}
