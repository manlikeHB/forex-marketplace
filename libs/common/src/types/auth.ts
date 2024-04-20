/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Timestamp } from '../../../../google/protobuf/timestamp';

export const protobufPackage = 'auth';

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

export interface Empty {}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: Timestamp | undefined;
  photo?: string | undefined;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: Timestamp | undefined | Date;
  photo?: string | undefined;
  role: UserRole;
  passwordChangedAt?: Timestamp | undefined | Date;
  passwordResetToken?: string | undefined | Date;
  active: boolean;
  passwordResetExpires?: Timestamp | undefined | Date;
  createdAt: Timestamp | undefined | Date;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateOneUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateOneUser(
    request: UpdateUserDto,
  ): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'findAllUsers',
      'findOneUser',
      'updateOneUser',
      'removeUser',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
