import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoleType {
  USER = 'user',
  ADMIN = 'admin',
}

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

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.USER })
  role: UserRoleType;

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
