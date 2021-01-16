import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityHelper } from '@/common/helpers/entity.helper'

@Entity()
export class Account extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column({ select: false })
  password: string

  @Column({ default: true, nullable: false })
  isActive: boolean
}
