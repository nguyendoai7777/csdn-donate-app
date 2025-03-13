import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import { MOCK_DATA } from '../mocks/data';
import { broadcastDonation, updateTopDonors } from '../shared/hepler';

const wsServer = Fastify();
wsServer.register(fastifyWebsocket);
let donateWS: WebSocket;

wsServer.register((f) => {
  f.register(async function (fastify) {
    fastify.get(
      '/ws',
      { websocket: true },
      (socket /* WebSocket */, req /* FastifyRequest */) => {
        donateWS = socket;
        socket.on('message', (message: any) => {
          console.log('📩 Received message:', message);
        });

        socket.on('close', () => {
          console.log('❌ Client disconnected');
          donateWS = void 0;
        });

        socket.on('error', (err: any) => {
          console.error('⚠️ WebSocket error:', err);
          donateWS = void 0;
        });
      }
    );
  });
});

async function ws() {
  try {
    await wsServer.listen({ port: 3002, host: '0.0.0.0' });
    console.log('🌐 WebSocket Server running at ws://localhost:3002/ws');
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * MOCK_DATA.length);
      const donation = MOCK_DATA[randomIndex];
      const amountValue = parseFloat(donation.amount.replace('$', ''));
      const p = {
        ...donation,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      };
      updateTopDonors(p, amountValue);

      broadcastDonation(p, donateWS);
    }, 5000);
  } catch (err) {
    console.error('🔥 WebSocket Server Error:', err);
    process.exit(1);
  }
}

export default ws;
