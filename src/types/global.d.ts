interface IAppSettings {
  readonly port: number
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
