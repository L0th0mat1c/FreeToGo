
import { Controller, Get, Post, Res, Query,  UseGuards, Body, HttpStatus, Req,NotFoundException, Put, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDTO, UpdateUserDTO, LoginUserDTO, UpdateProfileDTO, RegisterUserDTO } from '../users/dto/create_user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { JwtService } from '@nestjs/jwt';

// Les routes auth sont définit si dessous - pour les requête = /auth/...

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UsersService,
        private authService: AuthService,
        private jwtService: JwtService,) {}

// Local Auth Guard permet de renvoyer le token d'accès

    @UseGuards(LocalAuthGuard)
    @Post('login')
        async login(@Res() res, @Body() loginUserDTO: LoginUserDTO) {
        const user = await this.authService.login(loginUserDTO)
        const userData = await this.userService.findOne(loginUserDTO.username)
        const userSelected = {
            _id: userData._id,
            username: userData.username,
            email: userData.email,
            shopping_list: userData.shopping_list,
            stock: userData.stock,
            historic: userData.historic,
            wish_list: userData.wish_list
        }
        // const { username, _id, email, shopping_list, stock, wish_list} = userData;
       
        res.cookie('userToken',user, {httpOnly: true});
        const data = {
            user: userSelected,
            access_token: user
        }
        // console.log('response server', res)
        return res.status(HttpStatus.OK).json(data)
    }

    @Post('register')
        async register(@Res() res, @Body() createUserDTO: CreateUserDTO) {
            const test = await this.userService.findOneByMail(createUserDTO.email)
            if(test){
                throw new BadRequestException (['This Email is already taken'])
            }
            const testDeux = await this.userService.findOne(createUserDTO.username)
            if(testDeux){
                throw new BadRequestException (['This username is already taken'])
            }   
        const user = await this.userService.addUser(createUserDTO)
        return res.status(HttpStatus.OK).json(user)
    }

// JWT Auth guard permet d'authoriser l'accès si le token d'accès est définit dans le header

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Res() res, @Req() req) {
        console.log('req user profile', req.user)
        const userData = await this.userService.getUser(req.user.userId)
        const userSelected = {
            _id: userData._id,
            username: userData.username,
            email: userData.email,
            facebook_id: userData.facebook_id,
            shopping_list: userData.shopping_list,
            stock: userData.stock,
            wish_list: userData.wish_list
            
        }
        return res.status(HttpStatus.OK).json(userSelected);
  }

  // Facebook login /facebook renvoie sur le site facebook pour connection
    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
        return HttpStatus.OK;
    }
// facebook redirect correspond à la réponse de facebook avec les identifiants facebook de l'utilisateur
    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    facebookLoginRedirect(@Res() res, @Req() req: Request): Promise<any> {
        res.cookie('userToken',req.user, {httpOnly: true});
        console.log('req.user', req.user)
        
    return res.status(HttpStatus.OK).redirect('http://localhost:8080/#/signin/'+ req.user)
    }
    //send mail to reset password
    @Post('/forgotPassword')
    async forgotPassword(@Body() UpdateUserDTO: UpdateUserDTO): Promise<void> {
        return this.authService.forgotPassword(UpdateUserDTO);
    }    
    //change password
    @Post('/resetPassword')
    async resetPassword(@Res() res, @Body() UpdateUserDTO: UpdateUserDTO): Promise<void> {
        try {
            this.jwtService.verify(UpdateUserDTO.token) 
        } catch (error) {
            return res.status(401).json({ err: error });
        }
        await this.authService.resetPassword(UpdateUserDTO);
        return res.status(200).json({ result:"Password has been reseted"});
    }  
    // @UseGuards(JwtAuthGuard) 
    @Put('/updateUser')
    async updateUserProfile(@Res() res, @Query('userID') userID, @Body() updateProfileDTO: UpdateProfileDTO): Promise<void> {
       
        await this.userService.updateProfile(userID, updateProfileDTO);
        return res.status(200).json({ result:"Password has been reseted"});
    }

}
