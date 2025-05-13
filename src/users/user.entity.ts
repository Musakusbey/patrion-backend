import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'system_admin' | 'company_admin' | 'user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar' })
  role: UserRole;
}
