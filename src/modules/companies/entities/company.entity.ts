import { BaseModel } from 'src/common/basemodel'
import { Address } from 'src/modules/addresses/entities/addresses.entity'
import { Customer } from 'src/modules/customers/entities/customer.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Company extends BaseModel {
  fillable: string[] = ['name', 'email', 'cnpj', 'phone', 'isActive']

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  cnpj: string

  @Column()
  isActive: boolean

  @OneToOne(() => Address, (address) => address.company, { eager: true, onUpdate: 'CASCADE' })
  address: Address

  @OneToMany(() => Customer, (customer) => customer.company, { eager: true, onUpdate: 'CASCADE' })
  customers: Customer

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
