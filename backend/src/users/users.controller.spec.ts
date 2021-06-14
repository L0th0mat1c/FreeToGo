import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from './users.service';
import * as request from 'supertest'
import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDTO, LoginUserDTO, RegisterUserDTO, UpdateProfileDTO, UpdateUserDTO} from './dto/create_user.dto';

const app = 'http://localhost:3000';

let userToken: string;
let userTest: '';
let falseToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1ydGVzdE1hbiIsImVtYWlsIjoidGVzdGV1ckBtYWlsLmNvbSIsInN1YiI6IjYwMTQxOTdiNzg2Mzc1NTRhNGI3N2YxNCIsImlhdCI6MTYxMTkzMDI0MiwiZXhwIjoxNjExOTMwODQyfQ.Sw1iX3kFg81WnRkEJKqHrpS_0wWA7BwkdwlEAGvVl8k'

let userRegister: RegisterUserDTO = {
  username: 'MrtestMan',
  password: 'password',
  email: 'testeur@mail.com',
}
let userLogin: LoginUserDTO = {
  username: 'MrtestMan',
  password: 'password'
}
let userUpdate: UpdateUserDTO 

beforeAll(async () => {
  await axios.post('http://localhost:3000/auth/register', userRegister);
  const {data: {access_token, user}} = await axios.post('http://localhost:3000/auth/login', userLogin);
  userToken = access_token;
  userTest = user._id;
});


describe('User', () => {
  it('should list all users', () => {
    return request(app)
    .get('/user/users')
    .expect(HttpStatus.OK)
  });

  it("should can't  get me like user because i don't have token", () => {
    return request(app)
    .get(`/user/user/${userTest}`)
    .expect(HttpStatus.OK)
  });

  it("should get me like user", () => {
    return request(app)
    .get(`/user/user/${userTest}`)
    .set('Authorization', `Bearer ${userToken}`)
    .expect(HttpStatus.OK)
  });

  it("should can't update user", () => {
    return request(app)
    .put(`/user/update?userID=${userTest}`)
    .set('Authorization', `Bearer ${falseToken}`)
    .send(userUpdate)
    .expect(HttpStatus.UNAUTHORIZED)
  });

  it("should can update user", () => {
    return request(app)
    .put(`/user/update?userID=${userTest}`)
    .set('Authorization', `Bearer ${userToken}`)
    .send(userUpdate)
    .expect(HttpStatus.OK)
  });

  it("should can't delete my account when i'm connected with other token", () => {
    return request(app)
    .delete(`/user/delete?userID=${userTest}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .expect(HttpStatus.UNAUTHORIZED)
  });

  it("should delete my account when i'm connected", () => {
    return request(app)
    .delete(`/user/delete?userID=${userTest}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${userToken}`)
    .expect(HttpStatus.OK)
  });
 
  
})

// describe('UsersController', () => {
//   let userController: UsersController;
//   let userService: UsersService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService],
//     }).compile();
//     userService = moduleRef.get<UsersService>(UsersService);
//     userController = moduleRef.get<UsersController>(UsersController);
//   });

//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const result = ['test'];
//       jest.spyOn(userService, 'getAllUser').mockImplementation(() => result);

//       expect(await userController.getAllUser(CreateUserDTO).toBe(result));
//     });
//   });
// });
