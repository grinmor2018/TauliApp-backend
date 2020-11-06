import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/models/user-role.enum';

//operador propagacion ... : muestra los elementos del array roles

//Nest provides the ability to attach custom metadata to route handlers through the @SetMetadata() decorator. 
//This metadata supplies our missing role data, which a smart guard needs to make decisions.
//While this works, it's not good practice to use @SetMetadata() directly in your routes.
//Millor utilitzar => SetMetadata()
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
