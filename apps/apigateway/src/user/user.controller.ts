import { UserService } from './user.service';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import {
  LoginDto,
  SignUpDto,
  UpdateUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@app/common';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    return this.userService.signUp(body);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.userService.forgotPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }
}
