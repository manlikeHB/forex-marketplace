import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
  USER_SERVICE_NAME,
  UpdateUserDto,
  UserServiceClient,
} from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  findAll() {
    return this.userService.findAllUsers({});
  }

  findOne(id: number) {
    return this.userService.findOneUser({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.updateOneUser({ id, ...updateUserDto });
  }

  remove(id: number) {
    return this.userService.removeUser({ id });
  }

  login(loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  signUp(signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }

  forgotPassword(forgotPassword: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPassword);
  }
}
