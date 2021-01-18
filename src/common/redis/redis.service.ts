import { Inject, Injectable } from '@nestjs/common'

import { Redis } from 'ioredis'
import { Observable, Observer } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from './redis.constants'

export interface IRedisSubscribeMessage {
  readonly message: string
  readonly channel: string
}
@Injectable()
export class RedisService {
  public constructor(
    @Inject(REDIS_SUBSCRIBER_CLIENT) private readonly sub: Redis,
    @Inject(REDIS_PUBLISHER_CLIENT) private readonly pub: Redis
  ) {}

  public pubClient = this.pub
  public subClient = this.sub

  public fromEvent<T>(eventName: string): Observable<T> {
    this.sub.subscribe(eventName)

    return new Observable((observer: Observer<IRedisSubscribeMessage>) =>
      this.sub.on('message', (channel, message) => observer.next({ channel, message }))
    ).pipe(
      filter(({ channel }) => channel === eventName),
      map(({ message }) => JSON.parse(message))
    )
  }

  public async publish(channel: string, value: unknown): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      return this.pub.publish(channel, JSON.stringify(value), (error, reply) => {
        if (error) {
          return reject(error)
        }

        return resolve(reply)
      })
    })
  }
}
