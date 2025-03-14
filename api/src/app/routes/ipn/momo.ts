import { FastifyInstance } from 'fastify';
import { loadDonations } from '../../shared/hepler';

export default async function (fastify: FastifyInstance) {
  fastify.get('/momo', async function (request, reply) {
    return reply.status(200).code(204);
  });
  fastify.post('/momo', async function (request, reply) {
    console.log(`{} payload: `, request.body);
    return reply.code(204).send();
  });
}
