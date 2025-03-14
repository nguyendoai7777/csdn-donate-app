import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopupWindowPortalProps {
	children: ReactNode;
	title: string;
	width?: number;
	height?: number;
	onClose?: () => void;
}
export const DonationsHistoryIsolatedWindow: FC<PopupWindowPortalProps> = ({ children, title, width = 400, height = 600, onClose }) => {
	const [externalWindow, setExternalWindow] = useState<Window | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const [isOpened, setIsOpened] = useState(false);

	const openHistoryWindow = () => {
		const nativeRelCss = document.head.querySelector('link');
		const popup = window.open('', title, `width=${width},height=${height}`);
		const nativeStyles = Array.from(document.querySelectorAll('head style'))
			.map((c) => c.textContent)
			.join('');
		if (!popup) {
			console.error('Không thể mở cửa sổ popup. Vui lòng kiểm tra cài đặt popup blocker.');
			return;
		}

		const containerDiv = document.createElement('div');
		containerDiv.id = 'popup-root';
		const styleElement = document.createElement('style');
		styleElement.textContent = /* css */ `
      body {
        background-color: black;
        padding-right: 2px;
      }
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      #popup-root {
        width: 100%;
        height: 100svh;
        background-color: black;
        overflow: hidden scroll;
        padding: 0 4px 16px 16px;
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
        background-color: #777;
        border: 2px solid transparent;
        transition: .15s;
      }
      &:hover {
        ::-webkit-scrollbar-thumb {
          background-color: gray;
        }
      }
      ${nativeStyles}
    
    `;
		const extractFromAssets = (url: string) => {
			const match = url.match(/assets\/.*/);
			return match ? match[0] : null;
		};
		popup.document.title = title;
		const cssRel = document.createElement('link');
		cssRel.rel = 'stylesheet';
		popup.document.head.appendChild(styleElement);
		if (nativeRelCss) {
			cssRel.href = extractFromAssets(nativeRelCss.href);
			popup.document.head.appendChild(cssRel);
		}
		popup.document.body.appendChild(containerDiv);

		setExternalWindow(popup);
		setContainer(containerDiv);
		setIsOpened(true);
		const handleClose = () => {
			if (onClose) onClose();
		};

		popup.addEventListener('beforeunload', handleClose);

		return () => {
			popup.removeEventListener('beforeunload', handleClose);
			if (!popup.closed) {
				popup.close();
				setIsOpened(false);
			}
		};
	};

	const listenOpenHistoryWindow = (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
			e.preventDefault();
			if (!isOpened) {
				openHistoryWindow();
			}
		}
	};

	useEffect(() => {
		openHistoryWindow();
	}, [title, width, height, onClose]);
	useEffect(() => {
		document.addEventListener('keydown', listenOpenHistoryWindow);
		return () => {
			document.removeEventListener('kedown', listenOpenHistoryWindow);
		};
	}, []);
	if (!externalWindow || !container) return null;
	return createPortal(children, container);
};
