import { HttpService, Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Redis } from 'ioredis'
import { from, of } from 'rxjs'
import { map, timeout, catchError, withLatestFrom, concatMap, mergeMap } from 'rxjs/operators'

import { RedisService } from '@/common/redis/redis.service'
import { LoggerService } from '@/common/logger/logger.service'

import xml2json from '@/common/helpers/xml2json.helper'
import { inspect } from 'util'

@Injectable()
export class CollectorService {
  private redis: Redis
  constructor(
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
    private readonly http: HttpService
  ) {
    this.redis = this.redisService.pubClient
  }

  //   const user$ = getUser(email);
  // const products$ = user$.pipe(
  //   mergeMap(user => getProducts(user.interests)),
  //   withLatestFrom(user$),
  //   map(([products, user]) => {
  //     // Here we can access both user and products
  //   })
  // );
  @Cron(CronExpression.EVERY_5_SECONDS)
  async execTask(): Promise<void> {
    await this.redis.rpush('collector:queue', 'b0a5e475-68c4-4eb7-bc8e-455853cb90f0')
    await this.redis.rpush('collector:queue', '69f21be8-16ac-4af6-b2b5-e5313cc9fba9')

    const sourceId = from(this.redis.lpop('collector:queue'))
    const rss = sourceId.pipe(
      timeout(30 * 1000),
      concatMap((id) => this.redis.get(`source:${id}`)),
      concatMap((source) => this.http.get(JSON.parse(source).url)),
      map((res) => res.data),
      withLatestFrom(sourceId),
      catchError((error) => {
        this.logger.error(error, 'CollectorService')
        return of(error)
      })
    )
    rss.subscribe(
      async ([feeder, sourceid]) => {
        // this.logger.debug(inspect(feeder).slice(0, 2000), 'aaa')
        // this.logger.warn(inspect(sourceid).slice(0, 2000), 'ccc')
        const result = xml2json(feeder)
        if (result) {
          await this.redis.set(`feeder:${sourceid}`, JSON.stringify(result))
          this.logger.info(`fetched`)
        } else {
          this.logger.warn(`fetch failed`)
        }
      },
      (error) => {
        this.logger.error(error)
      }
    )
    // rss.subscribe((res) => console.log(res))
    // rss.from([(a = this.getQueue), this.getSource(a), this.getRss])
    // const queue = this.redis.lpop('collector:queue')
    // if (queue) {
    //   await this.redis.rpush('collector:queue', queue)
    //   const source = await this.redis.get(`source:${queue}`)
    //   if (source) {
    //     const rssOb = this.http.get(JSON.parse(source).url)
    //     rssOb.subscribe((res) => this.logger.debug(res.data))
    //   }
    //   // this.logger.debug(source)
    // }
    // const queue = await this.redis.keys('*')
  }
}
