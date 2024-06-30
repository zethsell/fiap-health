import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../common/decorators'
import { GoogleAuthApi } from '../gateways'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private gcp: GoogleAuthApi,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    try {
      const request = context.switchToHttp().getRequest()
      const token = this.extractTokenFromHeader(request)

      if (!token) throw new UnauthorizedException()

      const response = await this.gcp.verifyUser({ idToken: token })
      if (response === undefined) throw new UnauthorizedException()

      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: jwtConstants.secret,
      // })
      //
      // request['user'] = payload?.user
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
