import { BaseModel } from 'src/common/basemodel';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseModel {
  public fillable: string[] = ['name', 'email', 'password', 'isActive'];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  sysAdmin: boolean;
}
