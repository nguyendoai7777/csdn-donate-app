import { FastifyInstance } from 'fastify';
import { loadDonations } from '../shared/hepler';
import { Donation } from '../shared/types';
import { ipn } from './ipn';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function (request, reply) {
    return { message: 'Hello API' };
  });
  fastify.get('/top', async function (request, reply) {
    const topDonors = loadDonations();
    return reply.status(200).code(200).send(topDonors);
  });
  fastify.register(ipn, { prefix: '/ipn' });

}

