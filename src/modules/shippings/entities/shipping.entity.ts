import { BaseModel } from 'src/common/basemodel'
import { Customer } from 'src/modules/customers/entities/customer.entity'
import { Products } from 'src/modules/products/entities/products.entity'
import { ShippingHistory } from 'src/modules/shipping-history/entities/shippingHistory.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Shippings extends BaseModel {
  fillable: string[] = ['title', 'originCountry', 'trackingCode', 'updateEvery', 'orderId']

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  originCountry: string

  @Column({ unique: true, nullable: false })
  trackingCode: string

  @Column({ nullable: false })
  updateEvery: number

  @Column({nullable: false})
  orderId: string

  @Column({ default: new Date() })
  creationDate: Date

  @ManyToOne(() => Customer, (customer) => customer.shippings, { eager: true })
  @JoinColumn()
  customer: Customer

  @OneToMany(() => ShippingHistory, (history) => history.shipping, { eager: true })
  history: ShippingHistory[]

  @OneToMany(() => Products, (product) => product.shipping)
  products: Products[]

}
