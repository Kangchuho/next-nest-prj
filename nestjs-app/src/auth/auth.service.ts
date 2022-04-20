import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
      private userRepository: UserRepository,
      private jwtService: JwtService
    ){}

  async createUser(authUserDto: AuthUserDto): Promise<void> {
    await this.userRepository.createUser(authUserDto);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async signin(authUserDto: AuthUserDto): Promise<{ accessToken : string }> {
    const {username, password} = authUserDto;
    const user = await this.userRepository.findOne({username});
    if(user && (await bcrypt.compare(password, user.password))) {
      // jwt 토큰생성 (secret + payload)
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);     
      return { accessToken };
    }
    else {
      throw new UnauthorizedException('login failed');
    }
  } 

}
