import { useEffect, useState } from 'react';

export const useDragableState = () => {
	const [dragableState, setDragableState] = useState(true);
	useEffect(() => {
		let d = true;
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
				e.preventDefault(); // Ngăn chặn hành động mặc định (như thêm trang vào bookmark)
				d = !d;
				setDragableState(d);
				window.UIContextBridge.toggleTouchMode({ state: d });
			}
		});
	}, []);
	return dragableState;
};
