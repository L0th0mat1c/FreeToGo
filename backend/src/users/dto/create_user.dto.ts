import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
    // @IsNotEmpty()
    @MinLength(6, {
        message: "Your username have to min 6 characters"
    })
    readonly username: string;

    // @IsNotEmpty()
    // @IsEmail()
    readonly email: string;

    // @IsNotEmpty()
    // @MinLength(6, {
    //     message: "Your password have to min 6 characters"
    // })
    readonly password: string;

    readonly facebook_id: string;

    readonly stock: [{ingredients: string, quantity: number, unity: string}];
    readonly shopping_list: [{ingredients: string, quantity: number, unity: string}];
    readonly wish_list: [{id: string, title:string, img: string}];
    readonly token: string;
    readonly newpassword: string;
    readonly historic:[{id: Number, title: String, img: String, date: String}];
    readonly recipies: [{ingredients: string, quantity: number, unity: string}];
    readonly created_at: Date;
}
export class LoginUserDTO {
    @IsNotEmpty()
    @MinLength(6, {
        message: "Your username have to min 6 characters"
    })
    readonly username: string;
    @IsNotEmpty()
    @MinLength(6, {
        message: "Your password have to min 6 characters"
    })
    readonly password: string;
}
export class RegisterUserDTO {
    @IsNotEmpty()
    @MinLength(6, {
        message: "Your username have to min 6 characters"
    })
    readonly username: string;
    @IsNotEmpty()
    @MinLength(6, {
        message: "Your password have to min 6 characters"
    })
    readonly password: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    
}
export class UpdateProfileDTO {
    @IsNotEmpty()
    @MinLength(6, {
        message: "Your username have to min 6 characters"
    })
    readonly username: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6, {
        message: "Your password have to min 6 characters"
    })
    
    readonly password: string;
}

export class UpdateUserDTO {
    readonly id: string;
    readonly recipe_id: string;
    readonly token: string;
    readonly newpassword: string;
    readonly email: string;
    readonly username: string;
    readonly quantity: number;
    readonly ingredients: string;
    readonly recipies_ingredients: string;
    readonly unity: string;
    readonly histId: number;
    readonly title: string;
    readonly img: string;
    readonly date: string;
    readonly aisle: string;    
    readonly wish_id: string;
    readonly shopId:string;
    readonly name:string;
    readonly amount: Number;
    readonly unit: String;
    //readonly ingredientsShop : [{name:String, aisle: String, amount: Number, unit: String}];
    readonly ingredientsShop : string;
    //readonly ingredientsShopbb : {name:String, aisle: String, amount: Number, unit: String};
    readonly wish_list: [{wish_id: string, title: string, img: string}];
    readonly stock: [{ingredients: string, aisle:string, quantity: number, unity: string}];
    readonly historic:[{histId: Number, title: String, img: String, date: String}];
    readonly shopping_list: [{title: String, shopId: String, img:String, ingredientsShop: [{name:String, aisle: String, amount: Number, unit: String}]}];
    readonly recipies: [{title: String, recipe_id: String, img: String, recipies_ingredients: [{name: String, aisle: String, amount: Number, unit: String}] }];
}