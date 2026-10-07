import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TransacoesService } from './transacoes.service.js';
import { CreateTransacaoDTO } from './dto/create-transacao.dto.js';

@Controller('transacoes')
export class TransacoesController {

    constructor(private readonly transacaoService: TransacoesService){}

    @Post()
    createTransaction(@Body() transacaoData: CreateTransacaoDTO){
        return this.transacaoService.createTransacao(transacaoData)
    }

    @Get("/cliente/:id")
    getReport(@Param('id', ParseIntPipe) id: number){
        return this.transacaoService.findOne(id)
    }

}
