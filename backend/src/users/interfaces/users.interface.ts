import { Document } from 'mongoose';
export interface ingredientsShopSchema extends Document {
    readonly name:String, readonly aisle:String, readonly amount:Number, readonly unit:String
}
export interface User extends Document {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly facebook_id: string;
    readonly stock: [{ingredients: string, aisle:string, quantity: number, unity: string}],
    readonly shopping_list: [{title:String, shopId:String, img:String, ingredientsShop:[{name:String, aisle:String, amount:Number, unit:String}]}],
    readonly resetLink: string,
    readonly historic:[{histId: Number, title: String, img: String, date: String}],
    readonly wish_list: [{wish_id: string, title: string, img: string}],
    readonly recipies: [{title: String, recipe_id: String, img: String, recipies_ingredients: [{name: String, aisle:String, amount:Number, unit:String}]}],
    readonly created_at: Date;
}