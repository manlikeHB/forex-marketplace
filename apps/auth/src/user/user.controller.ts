import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserServiceController,
  UpdateUserDto,
  UserServiceControllerMethods,
  FindOneUserDto,
} from '@app/common';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  // createUser(createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  findAllUsers() {
    return this.userService.findAll();
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
}
