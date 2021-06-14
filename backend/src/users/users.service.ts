import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/users.interface';
import { CreateUserDTO, UpdateUserDTO, UpdateProfileDTO} from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { sendEmail } from '../utils/sendEmail';
import { createDecipher } from 'crypto';


@Injectable()
export class UsersService {
    // private readonly users = [
    //     {
    //       userId: 1,
    //       username: 'john',
    //       password: 'changeme',
    //     },
    //     {
    //       userId: 2,
    //       username: 'maria',
    //       password: 'guess',
    //     },
    //   ];
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // fetch all users
    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }
    async findOne(username: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({username: username}).exec();
        console.log('user', user)
        return user;
    }
    async findOneByMail(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({email: email}).exec();
        //console.log('user', user)
        return user;
    }
    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(createUserDTO.password, saltOrRounds);
        const data = {
            username: createUserDTO.username,
            email: createUserDTO.email,
            password: hash
        }
        const newUser = await new this.userModel(data);
        sendEmail(createUserDTO.email, createUserDTO.username);       
        return newUser.save();
    }
     // Edit user details

     async updateUser(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> { 
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, UpdateUserDTO, { new: true });
        return updatedUser;
    }      
     // Edit stock
     async addStock(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> {
        const userToAddStock = await this.userModel
            .findByIdAndUpdate(userID, 
                {$push : { stock :  { ingredients: UpdateUserDTO.ingredients,
                                        aisle:UpdateUserDTO.aisle,
                                        quantity: UpdateUserDTO.quantity,
                                        unity :UpdateUserDTO.unity
                                    } 
                         } 
                }, 
                { new: true }
            );
        return userToAddStock;
    }
    async updateStock(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> {
        const userToUpdateStock = await this.userModel.updateOne({_id: userID, "stock.ingredients": UpdateUserDTO.ingredients},
        {$set : { "stock.$.quantity" :  UpdateUserDTO.quantity} 
        })
        return userToUpdateStock;
    }
    // Delete a user' stock
    async deleteStock(userID,  UpdateUserDTO: UpdateUserDTO): Promise<any> {
        const userToDeleteStock = await this.userModel
        .findByIdAndUpdate(userID, 
            {$pull : { stock :  { ingredients: UpdateUserDTO.ingredients,
                                } 
                     } 
            }, 
            // { multi: true }
        );
        return userToDeleteStock;
    }
    // Delete a user
    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndRemove(userID);
        return deletedUser;
    }
    // Get a single user
    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec();
        return user;
    }
    async getUserEmail(email): Promise<User> {​​​​​
        const user = await this.userModel.findOne({​​​​​email: email}​​​​​).exec();
        return user;
        }​​​​​
    
    async findOrCreate(user): Promise<User> {
        const userCheck = await this.userModel
          .findOne({ 'facebook_id': user.facebook_id })
          .exec();
          console.log('facebook', userCheck);
        if (userCheck) {
          return userCheck;
        }
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
    async updateProfile(userID, UpdateProfileDTO: UpdateProfileDTO) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(UpdateProfileDTO.password, saltOrRounds);
        const data = {
          username: UpdateProfileDTO.username,
          email:  UpdateProfileDTO.email,
          password: hash
        }
        const updatedUser = await this.userModel
                .findByIdAndUpdate(userID, data, { new: true });
        return updatedUser;
      }
//        // Edit favorites
     async addFavorite(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> {
        const userToAddFavorite = await this.userModel
            .findByIdAndUpdate(userID, 
                {$push : { wish_list :  { wish_id: UpdateUserDTO.wish_id,
                                        title: UpdateUserDTO.title,
                                        img :UpdateUserDTO.img
                                    } 
                         } 
                }, 
                { new: true }
            );
        return userToAddFavorite;
    }
    // Delete a user' wish_list
    async deleteFavorite(userID,  UpdateUserDTO: UpdateUserDTO): Promise<any> {
        const userToDeleteFavorite = await this.userModel
        .findByIdAndUpdate(userID, 
            {$pull : { wish_list :  { wish_id: UpdateUserDTO.wish_id,
                                } 
                     } 
            }, 
            // { multi: true }
        );
        return userToDeleteFavorite;
    }

    // Edit stock
    async addHistoric(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> {
    console.log('UpdateUserDTO:', UpdateUserDTO)

    const userToAddHistoric = await this.userModel
        .findByIdAndUpdate(userID, 
            {$push : { historic :  { histId: UpdateUserDTO.histId,
                                    title:UpdateUserDTO.title,
                                    img: UpdateUserDTO.img,
                                    date :UpdateUserDTO.date
                                } 
                        } 
            }, 
            { new: true }
        );
        return userToAddHistoric;
    }
    // Delete a user' stock
    async deleteHistoric(userID,  UpdateUserDTO: UpdateUserDTO): Promise<any> {
        console.log('test:', UpdateUserDTO)
        const userToDeleteHistoric = await this.userModel
        .findByIdAndUpdate(userID, 
            {$pull : { historic :  { date: UpdateUserDTO.date,
                                } 
                     } 
            }, 
        );
        return userToDeleteHistoric;
    }

    // Edit shoplist
    async addShoplist(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> {
    const userToAddShoplist = await this.userModel
        .findByIdAndUpdate(userID, 
            {$push : { shopping_list :  { 
                                    title:UpdateUserDTO.title,
                                    shopId:UpdateUserDTO.shopId,
                                    img: UpdateUserDTO.img,
                                    ingredientsShop :JSON.parse(UpdateUserDTO.ingredientsShop)
                                } 
                        } 
            }, 
            { new: true }
        );
        return userToAddShoplist;
    }
    // Delete a user' stock
    async deleteShoplist(userID,  UpdateUserDTO: UpdateUserDTO): Promise<any> {
        const userToDeleteShoplist = await this.userModel
        .findByIdAndUpdate(userID, 
            {$pull : { shopping_list :  { title: UpdateUserDTO.title,
                                } 
                        } 
            }, 
        );
        return userToDeleteShoplist;
    }

    // Edit recipies
    async addRecipies(userID, UpdateUserDTO: UpdateUserDTO): Promise<User> {
        console.log('Updateu', UpdateUserDTO)
        const userToAddRecipies = await this.userModel
            .findByIdAndUpdate(userID, 
                {$push : { recipies :  { 
                                        title:UpdateUserDTO.title,
                                        recipe_id:UpdateUserDTO.recipe_id,
                                        img: UpdateUserDTO.img,
                                        recipies_ingredients :JSON.parse(UpdateUserDTO.recipies_ingredients)
                                    } 
                            } 
                }, 
                { new: true }
            );
           
            return userToAddRecipies;
        }
        // Delete a user' recipies
        async deleteRecipies(userID,  UpdateUserDTO: UpdateUserDTO): Promise<any> {
            console.log('Updateu', UpdateUserDTO)
            const userToDeleteRecipies = await this.userModel
            .findByIdAndUpdate(userID, 
                {$pull : { recipies :  { title: UpdateUserDTO.title,
                                    } 
                            } 
                }, 
            );
            return userToDeleteRecipies;
        }
    

}
