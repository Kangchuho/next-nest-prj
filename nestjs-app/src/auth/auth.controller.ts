import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}


  @Post('/signup')
  async signUp(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<void> {
    await this.authService.createUser(authUserDto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authUserDto: AuthUserDto, @Req() req): Promise<{ accessToken: string }> {
   
    const { accessToken } = await this.authService.signin(authUserDto);
    req.session = {
      jwt: accessToken,
    };
    //console.log(session);
    return { accessToken }
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User, @Req() req) {
    console.log(user);    
  }


}
