import { BaseModel } from "src/common/basemodel";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery extends BaseModel {
  fillable: string[] = [
    'title',
    'interval',
    'originProvince',
    'defaults',
    'tag'
  ];

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  originProvince: string

  @Column({ default: 30 })
  cicle: number

  @Column()
  interval: number

  @Column({ nullable: true })
  tag: string

  @Column('json')
  defaults: any

  @DeleteDateColumn()
  deletedAt: Date

}


