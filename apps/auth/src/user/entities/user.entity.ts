import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@app/common';

// enum UserRoleType {
//   USER = 'user',
//   ADMIN = 'admin',
// }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp with time zone' })
  dateOfBirth: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'timestamp with time zone', nullable: true })
  passwordChangedAt: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  passwordResetExpires: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'now()',
  })
  createdAt: string;
}
