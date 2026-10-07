import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { TransacaoEntity } from './entities/transacao.entity.js';

@Injectable()
export class TransacoesService {

    constructor(private readonly prismaService: PrismaService){}

    // async createTransacao(createTransacao: {}): Promise<TransacaoEntity>{
    async createTransacao(createTransacao: Prisma.TransacaoCreateInput&{clienteId: number | null}): Promise<TransacaoEntity>{
        
        const newTransaction = {...createTransacao}

        newTransaction.valor_liquido = this.calculo_taxa(
            Number(newTransaction.valor),
            newTransaction.parcela
        )

        if(newTransaction.data)
            newTransaction.data = new Date()

        newTransaction.taxa = this.verifica_taxa(newTransaction.parcela)

        // newTransaction.cliente = await this.prismaService.cliente.findUnique({where: {}})

        newTransaction.nivel_risco = this.regras_risco(Number(newTransaction.valor))

        const { clienteId, ...transactionData } = newTransaction;


        console.log(newTransaction)
        
        const createdTransaction = await this.prismaService.transacao.create({

            data: {
                    ...transactionData,
                    ...(clienteId ? { cliente: { connect: { id: clienteId } } } : {})
                }
            
        })

        if(!createdTransaction){
            // Verificar exceção lançada
            throw new BadRequestException("Erro ao cadastrar usuário")
        }

        return new TransacaoEntity(createdTransaction)

    }

    async findOne(id: number) {
        return this.prismaService.transacao.findMany({
            where: { clienteId: id },
            orderBy: {
                nivel_risco: "asc",
            },
            include: {
                cliente: true,
            },
        });
    }

    private calculo_taxa(valor:number, parcela: number): number{
        console.log("valor recebido: ", valor)
        const taxa_parcela = this.verifica_taxa(parcela)
        console.log("Taxa Parcela: ", taxa_parcela)
        
        const valorTotal = valor - ((valor * taxa_parcela) / 100)
        console.log("Valor Total: ", valorTotal)
        
        return valorTotal
    }

    private verifica_taxa(parcela: number){

         if(parcela >= 7 && parcela <= 12){
            return 3.99
        }

        if(parcela >= 2 && parcela <= 6){
            return 3.49
        }

        return 2.99
    }

    private regras_risco(valor: number): "ALTO" | "MEDIO" | "BAIXO"{

        // Adicionando risco Médio de padrão de retorno, já que não foi especificado no desafio
        
        const horaTransacao = new Date()
        
        if(valor > 10000){
            return "ALTO"
        }

        if(!(horaTransacao.getHours() > 5 && horaTransacao.getHours() < 23)){
            return "BAIXO"
        }

        // Inserindo valor padrão de retorno
        return "MEDIO"
        
    }
}
