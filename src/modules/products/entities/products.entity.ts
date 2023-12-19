import { BaseModel } from 'src/common/basemodel'
import { Shippings } from 'src/modules/shippings/entities/shipping.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Products extends BaseModel {
  fillable: string[] = ['name', 'price', 'quantity', 'lineItemId']

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  price: string

  @Column()
  quantity: string

  @Column()
  trackingCode: string

  @Column({ nullable: true, unsigned: true, type: 'bigint' })
  lineItemId: number

  @Column('json')
  status: any

  @ManyToOne(() => Shippings, (shipping) => shipping.products)
  shipping: Shippings
}
