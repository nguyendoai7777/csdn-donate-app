import { FC, use } from 'react';
import { Donation } from './shared/types';
import { AppContext } from './context/app.context';
import { Dragable } from './components/dragable/Dragable';

interface BagedStyle {
	layout: string;
	textColor: string;
	bagedColor: string;
}

const styled: Record<number, BagedStyle> = {
	1: {
		layout: 'border-purple-500 bg-gray-800 ',
		textColor: `text-purple-300`,
		bagedColor: ` bg-purple-600`,
	},
	2: {
		layout: 'border-orange-500 bg-gray-800 ',
		textColor: `text-orange-300`,
		bagedColor: ` bg-orange-600`,
	},
	3: {
		layout: 'border-blue-500 bg-gray-800 ',
		textColor: `text-blue-300`,
		bagedColor: ` bg-blue-600`,
	},
};

export const DonationTop: FC<{ donations: Donation[] }> = ({ donations }) => {
	const { dragable } = use(AppContext);
	return (
		<Dragable enabled={dragable} positionKey={'topDonate'} top={200} left={0}>
			<div className='flex gap-x-2'>
				{donations.map((donation, idx) => {
					const style = styled[idx + 1];
					return (
						<div key={donation.id} className={`bg-opacity-50 p-1 rounded border-l-4 hover:bg-gray-700 transition-colors min-w-[100px] ${style.layout}`}>
							<div className='flex items-center'>
								<span className='text-white'>Top {idx + 1}</span>
								<h3 className={`font-bold ml-2 ${style.textColor}`}>{donation.name}</h3>
								<span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold text-white ${style.bagedColor}`}>
									{Intl.NumberFormat('vi-VN', {
										currency: 'VND',
									}).format(donation.totalAmount)}{' '}
									<sup>₫</sup>
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</Dragable>
	);
};
