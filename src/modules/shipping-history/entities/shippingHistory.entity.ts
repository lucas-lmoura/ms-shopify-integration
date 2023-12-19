import { BaseModel } from 'src/common/basemodel'
import { Shippings } from 'src/modules/shippings/entities/shipping.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShippingHistory extends BaseModel {
  fillable: string[] = ['description', 'state', 'city', 'date', 'currentRoute']

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  description: string

  @Column()
  state: string

  @Column({ nullable: false })
  city: string

  @Column({ nullable: false })
  date: Date

  @Column({ nullable: false })
  currentRoute: string

  @Column({ default: false })

  notified: boolean

  @ManyToOne(() => Shippings, (shippings) => shippings.history)
  shipping: Shippings
}
