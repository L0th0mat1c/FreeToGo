// import { payloadInterface } from './interfaces/payload.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // Récupération de l'utilisateur authentifié
  async validate(payload: any) {
    console.log('payload', payload)
    return { userId: payload.sub, username: payload.username, email: payload.email };

  }
}