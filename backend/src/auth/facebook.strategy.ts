import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      // constructeur pour la route auth/facebook, redirect sur la page facebook pour connection
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: "https://freetogoback.herokuapp.com/auth/facebook/redirect",
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails, id } = profile;
    const userFacebook = {
      email: emails[0].value,
      username: name.givenName,
      facebook_id: id
    };
    const userRegister = await this.userService.findOrCreate(userFacebook);
    const payload = await this.authService.login(userRegister);
    // const user = payload.access_token +'/'+ userRegister._id
    // console.log('payload', payload)
    done(null, payload);
  }
}

