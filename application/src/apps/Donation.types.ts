import { ReactNode } from 'react';
import { Donation } from '../../shared/types';

export interface PDonation {
	donation: Donation;
	fixed?: boolean;
}

export interface PDonations {
	donations: Donation[];
}

export interface ReactBaseProps {
	children: ReactNode;
}
