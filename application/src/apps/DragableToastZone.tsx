import { FC, useEffect, DragEvent, useRef, useState, MouseEvent, useContext } from 'react';
import { DonationToast } from './DonationToast';
import { PDonation } from './Donation.types';
import { Dragable } from './Dragable';
import { AppContext } from './context/app.context';

export const RealtimeDonationToaster: FC<PDonation> = ({ donation }) => {
	const { dragable } = useContext(AppContext);

	return (
		<Dragable enabled={dragable} positionKey='realtimeNotification' top={500} left={0}>
			<DonationToast donation={donation} />
		</Dragable>
	);
};
