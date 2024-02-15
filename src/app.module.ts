import { Module } from '@nestjs/common';
import { UserController } from './user-service/user.controller';
import { UserService } from './user-service/user.service';
import {CommentsController} from "./comments-service/comments.controller";
import {CommentsService} from "./comments-service/comments.service";
import { MongooseModule } from '@nestjs/mongoose';
import {CryptoService} from "./user-service/crypto.service";
import {AuthService} from "./auth/auth.service";
import {UserEntity, UserSchema} from "./user-service/entities/user.entity";
import { ConfigModule } from '@nestjs/config';
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: "360days" },
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@botcluster.t80iarh.mongodb.net/?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])
  ],
  controllers: [UserController,CommentsController],
  providers: [UserService,CommentsService,CryptoService,AuthService,JwtService],
  exports: [UserService,JwtService]
})
export class AppModule {}
