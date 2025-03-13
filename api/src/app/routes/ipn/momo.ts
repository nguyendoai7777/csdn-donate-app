import { FastifyInstance } from 'fastify';
import { loadDonations } from '../../shared/hepler';

export default async function (fastify: FastifyInstance) {
  fastify.get('/momo', async function (request, reply) {
    return reply.status(200).code(200).send({
      message: 'from momo'
    });
  });
}

