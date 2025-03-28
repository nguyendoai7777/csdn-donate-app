import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactBaseProps } from '../../shared/Donation.types';
import { findZIndex } from '../../shared/helper';

export interface DragableOptions extends ReactBaseProps {
	positionKey: string;
	top: number;
	left: number;
	attachToBody?: boolean;
	enabled?: boolean;
}
export const Dragable: FC<DragableOptions> = ({ children, positionKey, top = 100, left = 0, attachToBody = true, enabled = true }) => {
	const [dragging, setDragging] = useState(false);
	const [position, setPosition] = useState(() => {
		const savedPosition = localStorage.getItem(positionKey);
		return savedPosition ? JSON.parse(savedPosition) : { left, top };
	});
	const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
	const liveDonateRef = useRef<HTMLDivElement>(null);
	const dragOffsetRef = useRef({ x: 0, y: 0 });

	const [layoutOrder, setLayoutOrder] = useState(1000);
	useEffect(() => {
		if (liveDonateRef.current) {
			const rect = liveDonateRef.current.getBoundingClientRect();
			setElementSize({ width: rect.width, height: rect.height });
		}
		const { max } = findZIndex();
		setLayoutOrder(max + 1);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (liveDonateRef.current) {
				const rect = liveDonateRef.current.getBoundingClientRect();
				setElementSize({ width: rect.width, height: rect.height });
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;
				const maxLeft = windowWidth - rect.width;
				const maxTop = windowHeight - rect.height;
				setPosition((prev: DOMRect) => ({
					left: Math.max(0, Math.min(prev.left, maxLeft)),
					top: Math.max(0, Math.min(prev.top, maxTop)),
				}));
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleMouseDown = (e: MouseEvent) => {
		const { max, current } = findZIndex(e);
		setLayoutOrder(current < max ? max + 1 : current);
		const rect = liveDonateRef.current?.getBoundingClientRect();
		if (rect) {
			dragOffsetRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
			setElementSize({ width: rect.width, height: rect.height });
		}

		handleMouseMove(e);
		setDragging(true);
		e.preventDefault();
	};

	const handleMouseMove = (e: MouseEvent) => {
		const newLeft = e.clientX - dragOffsetRef.current.x;
		const newTop = e.clientY - dragOffsetRef.current.y;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const maxLeft = windowWidth - elementSize.width;
		const maxTop = windowHeight - elementSize.height;
		const newPosition = {
			left: Math.max(0, Math.min(newLeft, maxLeft)),
			top: Math.max(0, Math.min(newTop, maxTop)),
		};
		setPosition(newPosition);
	};

	const handleMouseUp = () => {
		setDragging(false);
		localStorage.setItem(positionKey, JSON.stringify(position));
	};

	useEffect(() => {
		const mouseMoveHandler = (e: MouseEvent) => {
			if (dragging) {
				handleMouseMove(e);
			}
		};

		if (dragging) {
			document.addEventListener('mousemove', mouseMoveHandler as unknown as EventListener);
			document.addEventListener('mouseup', handleMouseUp);
		} else {
			document.removeEventListener('mousemove', mouseMoveHandler as unknown as EventListener);
			document.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', mouseMoveHandler as unknown as EventListener);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [dragging, position, elementSize]);

	const ChildComponent = (
		<div
			ref={liveDonateRef}
			style={{
				left: `${position.left}px`,
				top: `${position.top}px`,
				position: 'fixed',
				willChange: 'left, top',
				transform: 'translate3d(0,0,0)',
				zIndex: dragging ? 9999 : layoutOrder,
			}}
			data-zindex={layoutOrder}
			className={`Dragable ${enabled ? '' : 'disabled'} ${dragging ? 'border-opacity-100' : 'border-opacity-75'} select-none`}
		>
			<div
				className={`dragable-btn ${enabled ? '' : 'disabled'} ${dragging ? 'border-opacity-75' : ''}`}
				onMouseDown={handleMouseDown}
				style={{ touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab' }}
			/>

			<div className=' flex gap-3 flex-col'>{children}</div>
		</div>
	);

	return attachToBody ? createPortal(ChildComponent, document.querySelector('body')) : ChildComponent;
};
