import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateClienteDTO{
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({required: true, description: "Nome fantasia do cliente"})
    nome_fantasia: string
    
    @ApiProperty({required: true, description: "CNPJ do cliente"})
    @IsString()
    @IsNotEmpty()
    cnpj: string
}