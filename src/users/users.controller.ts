import { Controller, Post, Body, HttpException, HttpStatus, ClassSerializerInterceptor, UseInterceptors, UseGuards, Get, Param, Delete, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiOkResponse, ApiBearerAuth, ApiParam, ApiOperation } from '@nestjs/swagger';
import { UserRole } from '../users/models/user-role.enum';
import { RegisterDTO } from './models/dtos/register.dto';
import { UserDTO } from './models/dtos/user.dto';
import { LoginDTO } from './models/dtos/login.dto';
import { LoginResponseDTO } from './models/dtos/login-response.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { User } from './models/user.schema';
import { ApiException } from 'src/common/api-exception.model';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(User.name)
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) { }

    @Post('register')
    @ApiCreatedResponse({ type: UserDTO })
    @ApiBadRequestResponse({ type: ApiException })
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiOperation({ summary: "Registre d'usuari", description: "Crea un usuari nou a l'aplicació" })
    async register(@Body() dto: RegisterDTO): Promise<UserDTO> {
        const { nif, password } = dto;

        let exist;
        try {
            exist = await this.userService.findOne({ nif });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${nif} exists`, HttpStatus.BAD_REQUEST);
        }
        
        return this.userService.register(dto);
    }

    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseDTO })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation({ summary: "Login d'usuari", description: "Petició per fer login on es retorna un token per després poder fer les peticions" })
    async login(@Body() dto: LoginDTO): Promise<LoginResponseDTO> {
        return this.userService.login(dto);
    }

    @Get()
    @ApiOkResponse({ type: UserDTO })
    @ApiBadRequestResponse({ type: ApiException })
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard )
    @ApiBearerAuth()
    @ApiParam({ name: 'username'})
    @ApiOperation({ summary: "Retorna la llista d'usuaris", description: "Retorna la llista de tots els usuaris registrats a l'aplicació" })
    async getUsers(): Promise<UserDTO[]> {
        try {
            const users = await this.userService.findAll();
            return users.map((user) => new UserDTO(user.toJSON()));
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiOkResponse({ type: UserDTO })
    @ApiBadRequestResponse({ type: ApiException })
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna un usuari', description: 'Retorna un usuari a través del seu id' })
    async getUser(@Param('id') id: string): Promise<UserDTO> {
        try {
            const user = await this.userService.findById(id);
            return new UserDTO(user.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOkResponse({ type: UserDTO })
    @ApiBadRequestResponse({ type: ApiException })
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Esborra un usuari', description: 'Retorna l usuari esborrat' })
    async deleteUser(@Param('id') id: string): Promise<UserDTO> {
        try {
            const user = await this.userService.delete(id);
            return new UserDTO(user.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiOkResponse({ type: UserDTO })
    @ApiBadRequestResponse({ type: ApiException })
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualitza un usuari', description: 'Retorna un usuari actualitzat a través del seu id' })
    async updateUser(@Body() dto: UserDTO, @Param('id') id: string): Promise<UserDTO> {
        try {
            const user = await this.userService.update(id, dto);
            return new UserDTO(user.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}

