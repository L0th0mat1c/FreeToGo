import { Injectable, Res, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/users.interface';
import { CreateUserDTO, UpdateUserDTO, UpdateProfileDTO } from '../users/dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { passwordReset } from '../utils/sendEmail';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,)
         {}
// Méthode de validation de l'utilisateur, appeler avec le local strategy guard (LocalAuthGuard)
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password)
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  /* Service pour se connecter au compte utilisateur, 
   avec en réponse le token d'accès à récupéré afin d'authentifier l'utilisateur pour les JWT guard (JWTAuthGuard)*/
  async login(user: any) {
    // console.log('usr=rere', user)
    const userLog = await this.usersService.findOne(user.username);
    const payload = { username: userLog.username, email: userLog.email, sub: userLog._id };
    return this.jwtService.sign(payload)
 
  }
    //send mail for new password
  async forgotPassword(UpdateUserDTO: UpdateUserDTO): Promise<void> {

      const user = await this.usersService.findOneByMail(UpdateUserDTO.email);
      if (!user) {
          throw new NotFoundException('Invalid/wrong email');
      }
      const payload = {_id:user._id};
      const token = this.jwtService.sign(payload);
      //const token = jwt.sign({_id:user._id},{jwtConstants.secret},{expiresIn:3600});
      passwordReset(user.email, user.username, token);
      return user.updateOne({resetLink:token});
  }    
      //send mail for new password
  async resetPassword(UpdateUserDTO: UpdateUserDTO): Promise<void> {
        console.log('createUserDTO:', UpdateUserDTO)
        
    const user = await this.usersService.findOneByMail(UpdateUserDTO.email);
        if (!user) {
            throw new NotFoundException('Invalid/wrong email');
        }

        if(user.resetLink == UpdateUserDTO.token){
          console.log('ok')
          const saltOrRounds = 10;
          const hash = await bcrypt.hash(UpdateUserDTO.newpassword, saltOrRounds);
          return user.updateOne({password:hash});
        } else {
          throw new NotFoundException('Token not matching');
        }
  } 
  
  
}


