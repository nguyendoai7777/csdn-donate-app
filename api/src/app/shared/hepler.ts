import { readFileSync, writeFileSync } from 'fs';
import { Donation } from './types';
export const loadDonations = () => {
  let topDonors: Donation[] = [];
  try {
    const data = readFileSync('src/assets/top.json', 'utf-8');
    topDonors = JSON.parse(data);
  } catch (error) {
    topDonors = [];
  }
  return topDonors;
};
export const saveDonations =  (donors?: Donation[]) => {
  const topDonors = loadDonations();
  writeFileSync('src/assets/top.json', JSON.stringify(donors ?? topDonors, null, 2), 'utf-8');
};

// Cập nhật danh sách top 10 người donate nhiều nhất
export const updateTopDonors = (donor: Donation, amount: number) => {
  const topDonors = loadDonations();
  const existingDonor = topDonors.find((d) => d.name === donor.name);

  if (existingDonor) {
    existingDonor.totalAmount += amount;
  } else {
    topDonors.push({ ...donor, totalAmount: amount });
  }

  topDonors.sort((a, b) => b.totalAmount - a.totalAmount);
  topDonors.slice(0, 10);
  saveDonations(topDonors);
};

export const broadcastDonation = (donation: Donation, ws: WebSocket) => {
  const message = JSON.stringify({
    type: 'donation',
    data: donation,
  });
  if (ws?.readyState === 1) {
    try {
      ws.send(message);
    } catch (err) {
      console.error('❌ Error sending message:', err);
    }
  } else {
    ws = void 0;
  }
};