import { memo } from 'react';
import { AppContext } from './context/app.context';
import { DonateCard } from './DonateCard';
import { DonationTop } from './DonationTop';
import { RealtimeDonationToaster } from './DragableToastZone';
import { DonationsHistoryIsolatedWindow } from './HistoryIsolatedWindow';
import { useConnectDonationWebSocket } from './hooks/connect-websocket.hook';
import { useDragableState } from './hooks/dragable-state.hook';
import { useFetchTopDonations } from './hooks/fetch-top-donate.hook';
export function App() {
	const { donations, isLoading } = useFetchTopDonations();
	const { donationsHistory, latestDonation } = useConnectDonationWebSocket();
	const dragableState = useDragableState();

	const DonateHistoryList = memo(() => (
		<>
			{donationsHistory.map((d) => (
				<div key={d.id} className='mt-4'>
					<DonateCard donate={d} fixed={false} />
				</div>
			))}
		</>
	));

	const TopDonate = memo(() => <>{isLoading ? <div className='text-gray-400 text-center py-4'>Hãy đợi một chút...</div> : <DonationTop donations={donations} />}</>);

	return (
		<AppContext value={{ dragable: dragableState }}>
			<div className='w-full max-w-lg mx-auto'>
				<DonationsHistoryIsolatedWindow height={800} width={400} title='History'>
					<DonateHistoryList />
				</DonationsHistoryIsolatedWindow>
				<RealtimeDonationToaster donation={latestDonation} />
				<TopDonate />
			</div>
		</AppContext>
	);
}
