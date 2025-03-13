import { AppContext } from './context/app.context';
import AnimatedDonationAlerts from './Donations';
import { useEffect, useState } from 'react';
export function App() {
	const [dragableState, setDragableState] = useState(true);
	useEffect(() => {
		let d = true;

		/* import('electron').then((m) => {
			const ipc = m.ipcRenderer;
			console.log(`{} ipcRenderer: `, ipc);
		}); */
		// ipcMain.emit('toggleDragableMode');
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
				e.preventDefault(); // Ngăn chặn hành động mặc định (như thêm trang vào bookmark)
				d = !d;
				setDragableState(d);
				window.UIContextBridge.toggleTouchMode({ state: d });
				// ipcRenderer.send('ToggleTouchMode', { state: d });
				// Thực hiện hành động tùy chỉnh ở đây
			}
		});
	}, []);

	return (
		<AppContext value={{ dragable: dragableState }}>
			<AnimatedDonationAlerts />
		</AppContext>
	);
}
/* 
fetch(`${BE_URL}/ping`)
	.then((data) => data.json())
	.then((data) => {
		console.log(`{} data: `, data);
	});
 */
