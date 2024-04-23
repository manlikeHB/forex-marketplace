import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserServiceController,
  UpdateUserDto,
  UserServiceControllerMethods,
  FindOneUserDto,
  SignUpDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@app/common';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  // createUser(createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  async findAllUsers() {
    return await this.userService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.userService.findOne(findOneUserDto.id);
  }

  updateOneUser(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.userService.remove(findOneUserDto.id);
  }

  signUp(signupdto: SignUpDto) {
    return this.userService.signUp(signupdto);
  }

  async login(loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPasswordDto.email);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }
}
