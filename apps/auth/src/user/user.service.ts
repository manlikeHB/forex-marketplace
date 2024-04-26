import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
  UpdateUserDto,
  CreateUserDto,
  SendTokenAndData,
} from '@app/common';
import { DateTime } from 'luxon';
import { RpcException } from '@nestjs/microservices';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { mapUserRoleToEntityType } from '@app/common';

const scrypt = promisify(_scrypt);

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

  async create(createUserDto: CreateUserDto) {
    // const res = {
    //   ...createUserDto,
    //   ...{
    //     dateOfBirth: this.convertTimeStringToDate(createUserDto.dateOfBirth),
    //   },
    //   // ...{ role: mapUserRoleToEntityType(res.role) },
    // };

    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();

    return { users };
  }

  async findOne(id: any) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new RpcException('No user found!');
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

  // Sign Up new user
  async signUp(signUpDto: SignUpDto): Promise<SendTokenAndData> {
    const { email, password, passwordConfirm } = signUpDto;

    // Ceck if user already exist
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new RpcException(
        new BadRequestException('Email is already in use!'),
      );
    }

    // Check if password and passwrd confirm are the same
    if (password !== passwordConfirm) {
      throw new RpcException(
        new BadRequestException(
          'Password and password confirm are not the same!',
        ),
      );
    }

    // Check if pasword is up to 8 characters
    if (!password || password.length < 8) {
      throw new RpcException(
        new BadRequestException('Password has to be 8 or more characters!'),
      );
    }

    // generate salt
    const salt = randomBytes(8).toString('hex');

    // Hash password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join hash result and salt together
    const result = salt + '.' + hash.toString('hex');

    // Create new user with hashed password
    const newUser: CreateUserDto = {
      ...signUpDto,
      ...{ passwordConfirm: undefined },
      ...{ password: result },
    };

    const res = await this.create(newUser);

    const data = {
      ...res,
      password: undefined,
      passwordChangedAt: undefined,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
      role: 'user',
    };

    return { status: 'success', token: 'token', data };
  }

  async login(loginDto: LoginDto) {
    return this.res;
  }

  async forgotPassword(email: string) {
    return { status: 'ok', message: 'ok' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.res;
  }
}
