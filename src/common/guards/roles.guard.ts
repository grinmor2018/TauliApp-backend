import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/models/user-role.enum';
import { User } from '../../users/models/user.schema';


//To access the route's role(s) (custom metadata), we'll use the Reflector helper class, 
//which is provided out of the box by the framework and exposed from the @nestjs/core package.

//Like pipes and exception filters, GUARDS can be controller-scoped, method-scoped, or global-scoped. 
//Below, we set up a controller-scoped guard using the @UseGuards() decorator.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) { }

  //ExecutionContext extends ArgumentsHost, providing additional details about the current execution process. 
  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<UserRole[]>('roles', context.getHandler());
    //The getHandler() method returns a reference to the handler about to be invoked.
    if (!roles || roles.length === 0) {
      return true;// NO ENTENC
    }

    const request = context.switchToHttp().getRequest();
    const user: any = request.user;

    console.log('por el rolesgurad pasa el', user);

    const hasRole = () => roles.indexOf(user.role) >= 0;

    if (user && user.role && hasRole()) {
      return true;
    }

    throw new HttpException('You do not have permission (Roles)', HttpStatus.UNAUTHORIZED);
  }
}
