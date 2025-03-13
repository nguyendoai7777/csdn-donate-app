import { Donation } from '../shared/types';
import crypto from 'node:crypto';

export const DEFAULT_IMAGE = 'aoe.png';
export const MOCK_DATA: Donation[] = [
  {
    uuid: crypto.randomUUID(),
    name: 'NguoiHaoTam1',
    amount: '10.00',
    message: 'Chúc bạn stream vui vẻ!',
    imageUrl: DEFAULT_IMAGE,
    totalAmount: 0,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'GameLover123',
    amount: '5.00',
    message: 'Game hay quá, tiếp tục nhé!',
    imageUrl: DEFAULT_IMAGE,
    totalAmount: 0,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'FanCuongNhiet',
    amount: '20.00',
    message: 'Donate để ủng hộ, cố lên!',
    imageUrl: DEFAULT_IMAGE,
    totalAmount: 0,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'ViewerTrungThanh',
    amount: '8.00',
    message: 'Mình theo dõi bạn từ lâu rồi, stream hay lắm',
    imageUrl: DEFAULT_IMAGE,
    totalAmount: 0,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'KhachQuen',
    amount: '15.00',
    message: 'Đây là donate thường xuyên của mình',
    imageUrl: DEFAULT_IMAGE,
    totalAmount: 0,
  },
];
