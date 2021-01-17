interface IAppSettings {
  readonly port: number
  readonly socketPort: number
  readonly socketPingInterval: number
  readonly socketPinkTimeout: number
  readonly socketIoPath: string
}

interface IDBSettings {
  readonly host: string
  readonly port: number
  readonly username: string
  readonly password: string
  readonly database: string
}

interface ICorsSettings {
  readonly allowedOrigins: string | boolean | RegExp | (string | RegExp)[]
  readonly allowedPaths: string[]
  readonly allowedMethods: string | string[]
  readonly allowedCredentials: boolean
}

interface IRedisSettings {
  readonly use: boolean
  readonly host: string
  readonly port: number
  readonly password?: string
  readonly key?: string
}

interface ILogSettings {
  readonly level: string
  readonly silence: string[]
}
