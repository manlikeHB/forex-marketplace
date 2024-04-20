import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, Users, UpdateUserDto } from '@app/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  convertTime(createUserDto) {
    return new Date(createUserDto.dateOfBirth).toISOString();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      userName: createUserDto.userName,
      email: createUserDto.email,
      password: createUserDto.password,
      dateOfBirth: this.convertTime(createUserDto),
      photo: createUserDto.photo,
      role: undefined,
      passwordChangedAt: undefined,
      passwordResetToken: undefined,
      active: undefined,
      passwordResetExpires: undefined,
      createdAt: undefined,
    };

    const user = this.userRepository.create(newUser);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Users> {
    const users = await this.userRepository.find();

    return { users };
  }

  async findOne(id: number): Promise<User> {
    return this, this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.remove(user);
  }
}
