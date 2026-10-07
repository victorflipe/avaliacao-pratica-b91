import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller.js';
import { ClientesService } from './clientes.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, PrismaService]
})
export class ClientesModule {}
