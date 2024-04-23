import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
  UpdateUserDto,
} from '@app/common';
import { DateTime } from 'luxon';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  convertTimeStringToDate(dateOfBirth) {
    const parsedDate = DateTime.fromFormat(dateOfBirth, 'yyyy-LL-dd HH:mm:ss'); // Adjust format if necessary

    // Set the time zone explicitly if needed (optional)
    const utcDate = parsedDate.setZone('utc'); // Set to UTC time zone (adjust if needed)

    return utcDate.toJSDate();
  }

  async findAll() {
    const users = await this.userRepository.find();

    return { users };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new RpcException('No user with that id!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.remove(user);
  }

  res = {
    status: 'success',
    token: 'fghjk',
    data: {
      id: 1,
      firstName: 'joe',
      lastName: 'ok',
      userName: 'ok',
      email: 'ok',
      dateOfBirth: 'ok',
      photo: 'ok',
      role: 'ok',
      active: true,
      createdAt: 'ok',
    },
  };

  async login(loginDto: LoginDto) {
    return this.res;
  }

  async signUp(signUpDto: SignUpDto) {
    return this.res;
  }

  async forgotPassword(email: string) {
    return { status: 'ok', message: 'ok' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.res;
  }
}
