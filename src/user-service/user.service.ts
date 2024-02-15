import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserEntity} from "./entities/user.entity";
import {Model} from "mongoose";
import {SignupUserDto} from "./dto/signup-user.dto";
import {CryptoService} from "./crypto.service";
import {AuthService} from "../auth/auth.service";
import {SignInUserDto} from "./dto/signin-user.dto";

@Injectable()
export class UserService {
  constructor(
      @InjectModel('UserEntity')
      private readonly userModel: Model<UserEntity>,
      private readonly cryptoService: CryptoService,
      private readonly authService: AuthService
      ) {}
  async signUpUser(signUpUserDto: SignupUserDto): Promise<UserEntity> {
    if (!await this.findUserByEmail(signUpUserDto.email)) {
      const hashedPassword = await this.cryptoService.hashPassword(signUpUserDto.password);
      const createdUser = new this.userModel({...signUpUserDto, password: hashedPassword});
      return createdUser.save();
    } else {
      throw new ConflictException('User with this email already exists');
    }
  }

  async validateUser(signInUserDto: SignInUserDto): Promise<object> {
    const user = await this.userModel.findOne({ email: signInUserDto.email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await this.cryptoService.comparePasswords(signInUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //TODO JWT auth
    console.log(user);
    return user;
  }
  async findUserByEmail(email:string): Promise<boolean> {
    const user = await this.userModel.findOne({email: email}).exec()
    return !!user;
  }
}
