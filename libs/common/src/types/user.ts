/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum UserRole {
  USER = 0,
  ADMIN = 1,
  UNRECOGNIZED = -1,
}

export interface UpdateUserDto {
  id: number;
}

export interface FindOneUserDto {
  id: number;
}

export interface Empty {
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
  role: UserRole;
  passwordChangedAt?: string | undefined;
  passwordResetToken?: string | undefined;
  active: boolean;
  passwordResetExpires?: string | undefined;
  createdAt: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateOneUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;
}

export interface UserServiceController {
  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateOneUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllUsers", "findOneUser", "updateOneUser", "removeUser"];
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
