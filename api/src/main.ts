import Fastify from 'fastify';
import { app } from './app/app';
import fastifyCors from '@fastify/cors';
import { MOCK_DATA } from './app/mocks/data';
import { updateTopDonors } from './app/shared/hepler';
import ws from './app/websocket/ws';
import { ipn } from './app/routes/ipn';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

// Instantiate Fastify with some config
const server = Fastify();

server.register(app);
server.register(fastifyCors);

// Start listening.
const api = () => {
  server.listen({ port, host }, (err) => {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * MOCK_DATA.length);
      const donation = MOCK_DATA[randomIndex];

      const amountValue = parseFloat(donation.amount);
      const current = {
        ...donation,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      };
      updateTopDonors(current, amountValue);
    }, 5000);
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${host}:${port}`);
    }
  });
};

api();
void ws();
