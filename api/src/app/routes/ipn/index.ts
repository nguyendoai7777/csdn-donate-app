import { FastifyInstance } from 'fastify';
import { AppOptions } from '../../app';
import momo from './momo';
import vnpay from './vnpay';

export async function ipn(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(momo, {
    options: { ...opts },
  });
  fastify.register(vnpay, {
    options: { ...opts },
  });

}
