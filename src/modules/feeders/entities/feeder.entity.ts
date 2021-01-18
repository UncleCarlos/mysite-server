import { EntityHelper } from '@/common/helpers/entity.helper'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Feeder extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column('uuid')
  sourceId: string
  @Column()
  title: string
  @Column()
  author: string
  @Column()
  link: string
  @Column()
  pubDate: Date
  @Column()
  category: string
  @Column()
  description: string
}
