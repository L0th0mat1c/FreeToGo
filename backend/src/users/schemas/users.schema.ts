import * as mongoose from 'mongoose';
import { User } from '../interfaces/users.interface';

export const ingredientsShopSchema = new mongoose.Schema({
    name:String, aisle: String, amount: Number, unit: String
}, { _id: false })

export const UsersSchema = new mongoose.Schema({
    username: {type:String, unique:true, required: true},
    email: {type:String, unique:true, required: true},
    password: {type:String},
    facebook_id: String,
    stock: [{ingredients: String, aisle:String, quantity: Number, unity: String}],
    //shopping_list: [{ingredients: String, quantity: Number, unity: String}],
    shopping_list: [{title: String, shopId: String, img:String, ingredientsShop: [ingredientsShopSchema]}],
//    à voir ??? shopping_list: [{name:String, amount: Number, unit: String, aisle: String}],
    wish_list: [{wish_id: String, title: String, img: String}],
    resetLink: String,
    historic:[{histId: Number, title: String, img: String, date: String}],
    recipies: [{title: String, recipe_id: String, img: String, recipies_ingredients: [ingredientsShopSchema]}],
    created_at: { type: Date, default: Date.now }

})

