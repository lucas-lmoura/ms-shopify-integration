import { BaseModel } from 'src/common/basemodel'
import { Company } from 'src/modules/companies/entities/company.entity'
import { Shippings } from 'src/modules/shippings/entities/shipping.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Customer extends BaseModel {
  fillable: string[] = ['first_name', 'last_name', 'email', 'createdDate', 'phone', 'shopifyId', 'document']

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ length: 36, nullable: true })
  document: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: true })
  createdDate: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  shopifyId: string

  @ManyToOne(() => Company, (company) => company.customers, { lazy: true })
  @JoinColumn()
  company: Company

  @OneToMany(() => Shippings, (shipping) => shipping.customer, { lazy: true })
  @JoinColumn()
  shippings: Shippings[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
