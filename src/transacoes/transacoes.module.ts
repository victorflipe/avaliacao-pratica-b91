import { Module } from '@nestjs/common';
import { TransacoesController } from './transacoes.controller.js';
import { TransacoesService } from './transacoes.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [TransacoesController],
  providers: [TransacoesService, PrismaService]
})
export class TransacoesModule {}
