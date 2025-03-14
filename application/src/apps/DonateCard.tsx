import { FC } from 'react';
import { Donation } from './shared/types';
export const DonateCard: FC<{ donate: Donation; fixed?: boolean }> = ({ donate: d, fixed = true }) => {
	return (
		<div className={` z-50 ${fixed ? 'animate-slide-in w-[350px]' : ''}`} key={d.id}>
			<div className='rounded-lg shadow-lg overflow-hidden'>
				<div className='bg-purple-700 bg-opacity-85 px-4 py-2 flex justify-between items-center l'>
					<span className='font-bold text-white'>{d.name}</span>
					<span className='text-white font-bold'>
						{d.amount} <sup>₫</sup>
					</span>
				</div>
				<div className='px-4 py-2 bg-indigo-900 bg-opacity-85'>
					<div className='flex items-center'>
						<div className='w-12 h-12 rounded-full overflow-hidden mr-3 bg-purple-800 flex-shrink-0'>
							<img src={`images/${d.imageUrl}`} alt={d.name} className='w-full h-full object-cover' />
						</div>
						<div>
							<p className='text-white'>{d.message}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
