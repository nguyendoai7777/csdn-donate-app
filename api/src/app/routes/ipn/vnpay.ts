import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/vnpay', async function (request, reply) {
    return reply.status(200).code(200).send({
      message: 'from vnpay'
    });
  });
}

