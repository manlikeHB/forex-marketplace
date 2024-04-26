/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Empty {
}

export interface SignUpDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  dateOfBirth: string;
}

export interface LoginDto {
  userName?: string | undefined;
  email?: string | undefined;
  password: string;
}

export interface SendTokenAndData {
  status: string;
  token: string;
  data: Data | undefined;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  passwordConfirm: string;
}

export interface ForgotPasswordRes {
  status: string;
  message: string;
}

export interface Data {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  photo?: string | undefined;
  role: string;
  active: boolean;
  createdAt: string;
}

export interface UpdateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  photo?: string | undefined;
}

export interface FindOneUserDto {
  id: number;
}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  photo?: string | undefined;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  photo?: string | undefined;
  role: string;
  passwordChangedAt?: string | undefined;
  passwordResetToken?: string | undefined;
  active: boolean;
  passwordResetExpires?: string | undefined;
  createdAt: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  signUp(request: SignUpDto): Observable<SendTokenAndData>;

  login(request: LoginDto): Observable<SendTokenAndData>;

  forgotPassword(request: ForgotPasswordDto): Observable<ForgotPasswordRes>;

  resetPassword(request: ResetPasswordDto): Observable<SendTokenAndData>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateOneUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;
}

export interface UserServiceController {
  signUp(request: SignUpDto): Promise<SendTokenAndData> | Observable<SendTokenAndData> | SendTokenAndData;

  login(request: LoginDto): Promise<SendTokenAndData> | Observable<SendTokenAndData> | SendTokenAndData;

  forgotPassword(
    request: ForgotPasswordDto,
  ): Promise<ForgotPasswordRes> | Observable<ForgotPasswordRes> | ForgotPasswordRes;

  resetPassword(request: ResetPasswordDto): Promise<SendTokenAndData> | Observable<SendTokenAndData> | SendTokenAndData;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateOneUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "signUp",
      "login",
      "forgotPassword",
      "resetPassword",
      "findAllUsers",
      "findOneUser",
      "updateOneUser",
      "removeUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
