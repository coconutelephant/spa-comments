import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserEntity} from "../user-service/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user: UserEntity): Promise<string> {
        try {
        const payload = { username: user.name, sub: user.id };
        return this.jwtService.sign(payload);
            } catch (error) {
            console.log(error);
        }
    }

}
