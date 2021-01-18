import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityHelper } from '@/common/helpers/entity.helper'

@Entity()
export class Source extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  url: string
}
