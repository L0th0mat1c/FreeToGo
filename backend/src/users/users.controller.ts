import { Controller, Get, Req, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/create_user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) { }

    // add a user
    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {     
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }
    // Retrieve users list
    // @UseGuards(JwtAuthGuard)
    @Get('users')
    async getAllUser(@Res() res) {
        const users = await this.userService.getAllUser();
        return res.status(HttpStatus.OK).json(users);
    }
    //Fetch a particular user using ID
    // @UseGuards(JwtAuthGuard)
    @Get('user/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
    // Update a user's details
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateUser(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.updateUser(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user
        });
    }
    // add a user's stock
    @Put('/addStock')
    async addStock(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.addStock(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Stock has been successfully updated',
            user
        });
    }
    // Update a user's stock
    @Put('/updateStock')
    async updateStock(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.updateStock(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Specified stock has been successfully updated'
        });
    }
    // Delete a user's stock
    @UseGuards(JwtAuthGuard)
    @Put('/deleteStock')
    async deleteStock(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.deleteStock(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Specified stock has been deleted',
            user
        })
    }    
    // Delete a user
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const user = await this.userService.deleteUser(userID);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }

    @Get('email')
    async getUserEmail(@Res() res,
    @Query('email') email) {​​​​​
        const user = await this.userService.getUserEmail(email);
        console.log(user)
        console.log(email)
        if (!user) throw new NotFoundException('This email does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }​​​​​

    // // Update a user's wish_list
    @Put('/addFavorite')
    async addFavorite(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.addFavorite(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Specified favorites has been successfully updated',
            user
        });
    }
    // Delete a user's wish_list
    @Put('/deleteFavorite')
    async deleteFavorite(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.deleteFavorite(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Specified stock has been deleted',
            user
        })
    }    
    // // Update a user's historic
    @UseGuards(JwtAuthGuard)
    @Put('/addHistoric')
    async addHistoric(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.addHistoric(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Historic has been successfully updated',
            user
        });
    }
    // Delete a user's historic
    @UseGuards(JwtAuthGuard)
    @Put('/deleteHistoric')
    async deleteHistoric(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.deleteHistoric(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Specified item has been deleted from historic',
            user
        })
    }  

    // // Update a user's shoplist
    @UseGuards(JwtAuthGuard)
    @Put('/addShoplist')
    async addShoplist(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        console.log('UpdateUserDTO1:', UpdateUserDTO)

        const user = await this.userService.addShoplist(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'The shopping list has been successfully updated',
            user
        });
    }
    // Delete a user's shoplist
    @UseGuards(JwtAuthGuard)
    @Put('/deleteShoplist')
    async deleteShoplist(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.deleteShoplist(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Specified item has been deleted from shopping list'
        })
    }  
    // // Update a user's recipies
    @UseGuards(JwtAuthGuard)
    @Put('/addRecipies')
    async addRecipies(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        console.log('UpdateUserDTO1:', UpdateUserDTO)

        const user = await this.userService.addRecipies(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'The recipies list has been successfully updated',
            user
        });
    }

    // Delete a user's recipies
    // @UseGuards(JwtAuthGuard)
    @Put('/deleteRecipies')
    async deleteRecipies(@Res() res, @Query('userID') userID, @Body() UpdateUserDTO: UpdateUserDTO) {
        const user = await this.userService.deleteRecipies(userID, UpdateUserDTO);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Specified item has been deleted from recipies list',
            user
        })
    }  
}
