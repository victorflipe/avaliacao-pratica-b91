import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { ClientesModule } from './clientes/clientes.module.js';
import { TransacoesModule } from './transacoes/transacoes.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ClientesModule, TransacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
