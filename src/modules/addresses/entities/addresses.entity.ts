import { BaseModel } from 'src/common/basemodel'
import { Company } from 'src/modules/companies/entities/company.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Address extends BaseModel {
  fillable: string[] = ['street', 'number', 'complement', 'city', 'state', 'country']

  @PrimaryColumn('uuid')
  id: string

  @Column()
  street: string

  @Column()
  number: string

  @Column({ nullable: true })
  complement: string

  @Column()
  city: string

  @Column()
  state: string

  @Column({ default: 'BRASIL' })
  country: string

  @OneToOne(() => Company, (company) => company.id, { onUpdate: 'CASCADE', lazy: true })
  @JoinColumn()
  company: Company

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
