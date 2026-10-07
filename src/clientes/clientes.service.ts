import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ClienteEntity } from './entities/cliente.entity.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class ClientesService {

    constructor(private readonly prisma: PrismaService){}

    async create(cliente: Prisma.ClienteCreateInput){
        
        try{

            const createdUser = await this.prisma.cliente.create({
                data: cliente
            })
            
            return new ClienteEntity(createdUser)

        }catch(exception){
            
            if(exception){
                throw new ConflictException("Cliente com esse CNPJ já existe")
            }

        }
    }

    async getRelatorio(id: number){
        return await this.prisma.transacao.findMany({where: {clienteId: id}})
    }
}
