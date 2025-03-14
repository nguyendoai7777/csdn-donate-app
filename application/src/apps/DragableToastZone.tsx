import { FC, memo, use } from 'react';
import { DonateCard } from './DonateCard';
import { Dragable } from './components/dragable/Dragable';
import { AppContext } from './context/app.context';
import { useRealtimeDonateBusiness } from './hooks/realtime-donate.hooks';
import { PDonation } from './shared/Donation.types';

export const RealtimeDonationToaster: FC<PDonation> = ({ donation }) => {
	const { dragable } = use(AppContext);
	const toasts = useRealtimeDonateBusiness({ donation });

	const Toasts = memo(() => (
		<>
			{toasts.map((d, idx) => (
				<DonateCard donate={d} key={d.id} />
			))}
		</>
	));

	return (
		<Dragable enabled={dragable} positionKey='realtimeNotification' top={500} left={0}>
			<Toasts />
		</Dragable>
	);
};
