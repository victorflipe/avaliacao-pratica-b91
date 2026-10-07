import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator"
import { Status, TipoTransacao } from "../../generated/prisma/enums.js"

export class CreateTransacaoDTO{
    
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Min(0.1)
    @IsNotEmpty()
    valor: number
    
    @ApiProperty()
    @IsEnum(TipoTransacao)
    @IsNotEmpty()
    tipo_transacao: TipoTransacao
    
    @ApiProperty()
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(12)
    parcela: number

    taxa:number

    @ApiProperty({ required: false, nullable: true })
    clienteId: number | null;
}