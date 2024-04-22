/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

// export interface Empty {
// }

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

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  signUp(request: SignUpDto): Observable<SendTokenAndData>;

  login(request: LoginDto): Observable<SendTokenAndData>;

  forgotPassword(request: ForgotPasswordDto): Observable<ForgotPasswordRes>;

  resetPassword(request: ResetPasswordDto): Observable<SendTokenAndData>;
}

export interface UserServiceController {
  signUp(request: SignUpDto): Promise<SendTokenAndData> | Observable<SendTokenAndData> | SendTokenAndData;

  login(request: LoginDto): Promise<SendTokenAndData> | Observable<SendTokenAndData> | SendTokenAndData;

  forgotPassword(
    request: ForgotPasswordDto,
  ): Promise<ForgotPasswordRes> | Observable<ForgotPasswordRes> | ForgotPasswordRes;

  resetPassword(request: ResetPasswordDto): Promise<SendTokenAndData> | Observable<SendTokenAndData> | SendTokenAndData;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "login", "forgotPassword", "resetPassword"];
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
