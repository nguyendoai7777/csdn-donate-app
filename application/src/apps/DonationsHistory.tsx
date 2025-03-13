import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Donation } from '../../shared/types';
import { DonateCard } from './DonateCard';
// PopupWindowPortal.tsx

interface PopupWindowPortalProps {
	children: ReactNode;
	title: string;
	width?: number;
	height?: number;
	onClose?: () => void;
}

const PopupWindowPortal: FC<PopupWindowPortalProps> = ({ children, title, width = 400, height = 600, onClose }) => {
	const [externalWindow, setExternalWindow] = useState<Window | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	useEffect(() => {
		// Mở cửa sổ popup
		const popup = window.open('', title, `width=${width},height=${height}`);
		const nativeStyles = Array.from(document.querySelectorAll('head style'))
			.map((c) => c.textContent)
			.join('');
		if (!popup) {
			console.error('Không thể mở cửa sổ popup. Vui lòng kiểm tra cài đặt popup blocker.');
			return;
		}

		// Tạo container div trong cửa sổ mới
		const containerDiv = document.createElement('div');
		containerDiv.id = 'popup-root';

		// Thêm một số CSS cơ bản cho cửa sổ popup
		const styleElement = document.createElement('style');
		styleElement.textContent = /* css */ `
      body {
        background-color: black;
      }
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        padding-right: 2px;
      }
      #popup-root {
        width: 100%;
        height: 100svh;
        background-color: black;
        overflow: hidden scroll;
        padding-block: 16px;
        padding-left: 24px;
        padding-right: 4px;
      }
  
      ::-webkit-scrollbar-track {
        background-color: black;
      }

      ::-webkit-scrollbar {
        width: 10px;
        background-color: black;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: gray;
        border: 2px solid transparent;
      }
      ${nativeStyles}
  
    `;

		// Thiết lập tiêu đề cho cửa sổ
		popup.document.title = title;

		// Thêm style và container vào cửa sổ mới
		popup.document.head.appendChild(styleElement);
		popup.document.body.appendChild(containerDiv);

		// Lưu tham chiếu tới cửa sổ và container
		setExternalWindow(popup);
		setContainer(containerDiv);

		const handleClose = () => {
			if (onClose) onClose();
		};

		popup.addEventListener('beforeunload', handleClose);

		// Cleanup khi component unmount
		return () => {
			popup.removeEventListener('beforeunload', handleClose);
			if (!popup.closed) {
				popup.close();
			}
		};
	}, [title, width, height, onClose]);

	// Chỉ render khi cả cửa sổ và container đều tồn tại
	if (!externalWindow || !container) return null;

	// Sử dụng ReactDOM.createPortal để render children vào container trong cửa sổ mới
	return createPortal(children, container);
};

export default PopupWindowPortal;
export const DonationsHistoryList: FC<{ donations: Donation[] }> = ({ donations }) => {
	return (
		<div className='flex flex-col gap-3 items-center'>
			{donations.map((d) => (
				<DonateCard donate={d} key={d.id} fixed={false} />
			))}
		</div>
	);
};
