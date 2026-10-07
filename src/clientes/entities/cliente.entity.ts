import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { Cliente } from "../../generated/prisma/client.js"

export class ClienteEntity implements Cliente{

    @IsString()
    id: number
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({required: true, description: "Nome fantasia do cliente"})
    nome_fantasia: string
    
    @ApiProperty({required: true, description: "CNPJ do cliente"})
    @IsString()
    @IsNotEmpty()
    cnpj: string

    createdAt: Date
    updatedAt: Date

    constructor(partial: Partial<ClienteEntity>){
        Object.assign(this, partial)
    }
}