import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDTO } from './dto/create-cliente.dto.js';
import { ClientesService } from './clientes.service.js';

@Controller('clientes')
export class ClientesController {
    
    constructor(private readonly clienteService: ClientesService){}

    @Post()
    createUser(@Body() cliente: CreateClienteDTO){
        return this.clienteService.create(cliente)
    }
}
