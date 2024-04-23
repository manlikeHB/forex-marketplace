import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const users = [
    { id: 1, userName: 'test' },
    { id: 2, userName: 'cool' },
  ];

  const mockUserSerice = {
    findAll: jest.fn(() => {
      return {
        users,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserSerice)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('auth user controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', () => {
    expect(controller.findAllUsers()).toEqual({ users });
  });
});
