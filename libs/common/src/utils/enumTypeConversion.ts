// import { UserRole } from '../types';
import { UserRoleType } from 'apps/auth/src/user/entities/user.entity';

export function mapUserRoleToEntityType(role) {
  switch (role) {
    case role.USER:
      return UserRoleType.USER;
    case role.ADMIN:
      return UserRoleType.ADMIN;
    default:
      throw new Error(`Unsupported UserRole value: ${role}`);
  }
}

// export function mapUserRoleToProtoType(roleType) {
//   switch (roleType) {
//     case UserRoleType.USER:
//       return UserRole.USER;
//     case UserRoleType.ADMIN:
//       return UserRole.ADMIN;
//     default:
//       throw new Error(`Unsupported UserRoleType value: ${roleType}`);
//   }
// }
