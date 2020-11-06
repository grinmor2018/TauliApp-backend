import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApiException {
    @ApiPropertyOptional() statusCode?: number;
    @ApiPropertyOptional() message?: string;
    @ApiPropertyOptional() status?: string;
    @ApiPropertyOptional() error?: string;
    @ApiPropertyOptional() timestamp?: string;
    @ApiPropertyOptional() path?: string;
}
