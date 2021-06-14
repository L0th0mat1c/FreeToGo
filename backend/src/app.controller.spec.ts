import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import 'dotenv/config';
import { LoginUserDTO, RegisterUserDTO } from './users/dto/create_user.dto';
import { HttpStatus } from '@nestjs/common';
import axios from 'axios';

const app = 'http://localhost:3000';

beforeAll

describe('ROOT', () => {
 // test pour commencer 
    it('should return "Hello World!"', () => {
      return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
    });
});

describe('AUTH', () => {

// test  pour la création de compte 
  it('should register', () => {
    const user: RegisterUserDTO = {
      username: 'username',
      email: 'email',
      password: 'password',
    };
    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(user)
    .expect(HttpStatus.OK)
  });

// test pour se connecter au site
  it('should reject duplicate registration', () => {
    const user: RegisterUserDTO = {
      username: 'username',
      email: 'email',
      password: 'password',
    };
    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(user)
    .expect(HttpStatus.BAD_REQUEST)
  });

// test pour une connection sans être enregistrer sur le site
  it("should reject my connect because i'm outsider", () => {
    const user: LoginUserDTO = {
      username: 'inconnu',
      password: 'inconnu'
    }
    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect(HttpStatus.INTERNAL_SERVER_ERROR)
  });

  // test pour une connection normal
  it('should accept login for connect', () => {
    const user: LoginUserDTO = {
      username: 'username',
      password: 'password'
    }
    return request(app)
    .post('/auth/login')
    .set('Accept', 'appplication/json')
    .send(user)
    .expect(HttpStatus.OK)
  });

  // test de suppression de compte avec token authentification
  it("should delete my account when i'm connect", async() => {
    let userID: string;
    let token: string;
    const userLog: LoginUserDTO = {
      username: 'username',
      password: 'password'
    }
    const {data: {access_token,  user}} = await axios.post('http://localhost:3000/auth/login', userLog); 
    userID = user._id;
    console.log('userID', userID)
    token = access_token;
    console.log('token', token)

    return request(app)
    .delete(`/user/delete?userID=${userID}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect(HttpStatus.OK)
  });
});
