export default () => ({
  port: parseInt(process.env.PORT, 10) || 3005,
  postgres: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: 'postgres',
    password: 'pvTBV@QdS7)xecN2',
    database: '2021',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
})
