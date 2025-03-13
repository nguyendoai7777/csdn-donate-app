export interface ToggleTouchModeDataTransfer {
	state: boolean;
}
export interface UIContextBridge {
	toggleTouchMode(data: ToggleTouchModeDataTransfer): void;
}
