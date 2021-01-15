export default () => ({
  port: parseInt(process.env.PORT, 10) || 3005,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  },
  postgres: {
    host: process.env.DATABASE_HOST || '192.168.1.100',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: 'postgres',
    password: 'pvTBV@QdS7)xecN2',
    database: '2021',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
})
