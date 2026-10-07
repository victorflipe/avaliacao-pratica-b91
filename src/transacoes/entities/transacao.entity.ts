import { ApiProperty } from "@nestjs/swagger"
import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { NivelRisco, Status, TipoTransacao } from "../../generated/prisma/enums.js"
import { Decimal } from "../../generated/prisma/internal/prismaNamespace.js"
import { ClienteEntity } from "../../clientes/entities/cliente.entity.js"

export class TransacaoEntity{
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    valor: Decimal
    
    @ApiProperty()
    @IsEnum(TipoTransacao)
    @IsNotEmpty()
    tipo_transacao: TipoTransacao
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    parcela: number

    @IsNumber()
    id: number
    
    @ApiProperty()
    data?: Date | null
    
    @ApiProperty()
    taxa: Decimal

    @ApiProperty()
    @IsDecimal()
    valor_liquido: Decimal | null

    @ApiProperty()
    status: Status | null
    
    @ApiProperty()
    nivelRisco: NivelRisco | null

    @ApiProperty({ required: false, nullable: true })
    clienteId: number | null;

    @ApiProperty({ required: false, type: ClienteEntity })
    cliente?: TransacaoEntity | null;

    constructor({ cliente, ...data }: Partial<TransacaoEntity>) {
        Object.assign(this, data);

        if (cliente) {
            this.cliente = new TransacaoEntity(cliente);
        }
    }
    
}