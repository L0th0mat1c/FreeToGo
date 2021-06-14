import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Jean-Christophe:cuirmoustache@cluster0.zsxcd.mongodb.net/FreeToGo?retryWrites=true&w=majority', {useNewUrlParser: true}),AuthModule, UsersModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
