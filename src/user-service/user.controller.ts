import {BadRequestException, Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {SignupUserDto} from "./dto/signup-user.dto";
import {SignInUserDto} from "./dto/signin-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUpUser(@Body() createUserDto: SignupUserDto) {
    try {
      await this.userService.signUpUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signIn')
  async signInUser(@Body() signInUserDto: SignInUserDto) {
    try {
      await this.userService.validateUser(signInUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
