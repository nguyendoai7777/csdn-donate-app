import { FC, useEffect, DragEvent, useRef, useState, MouseEvent } from 'react';
import { DonationToast } from './DonationToast';
import { PDonation } from './Donation.types';
import { Dragable } from './Dragable';

export const RealtimeDonationToaster: FC<PDonation> = ({ donation }) => {
	return (
		<Dragable positionKey='realtimeNotification' top={500} left={0}>
			<DonationToast donation={donation} />
		</Dragable>
	);
};
